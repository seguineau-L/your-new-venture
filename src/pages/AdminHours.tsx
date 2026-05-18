import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import logoImg from "@/assets/icons/momuy-tech-algerian.svg";

type OpeningHour = {
  id: number;
  day_key: string;
  day_label: string;
  open_morning: string | null;
  close_morning: string | null;
  open_afternoon: string | null;
  close_afternoon: string | null;
  is_closed: boolean;
  sort_order: number;
};

const AdminHours = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const init = async () => {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        console.error("Erreur session :", sessionError);
        setLoading(false);
        return;
      }

      if (!sessionData.session) {
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);

      const { data, error } = await supabase
        .from("opening_hours")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Erreur chargement horaires :", error);
        setLoading(false);
        return;
      }

      setHours((data ?? []) as OpeningHour[]);
      setLoading(false);
    };

    init();
  }, []);

  const handleChange = (
    id: number,
    field: keyof OpeningHour,
    value: string | boolean | null
  ) => {
    setHours((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleHalfDayToggle = (
    id: number,
    period: "morning" | "afternoon",
    checked: boolean
  ) => {
    setHours((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (period === "morning") {
          return {
            ...item,
            open_morning: checked ? null : item.open_morning ?? "09:00",
            close_morning: checked ? null : item.close_morning ?? "12:00",
          };
        }

        return {
          ...item,
          open_afternoon: checked ? null : item.open_afternoon ?? "14:00",
          close_afternoon: checked ? null : item.close_afternoon ?? "18:00",
        };
      })
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      for (const hour of hours) {
        const { error } = await supabase
          .from("opening_hours")
          .update({
            open_morning: hour.is_closed ? null : hour.open_morning,
            close_morning: hour.is_closed ? null : hour.close_morning,
            open_afternoon: hour.is_closed ? null : hour.open_afternoon,
            close_afternoon: hour.is_closed ? null : hour.close_afternoon,
            is_closed: hour.is_closed,
          })
          .eq("id", hour.id);

        if (error) {
          throw error;
        }
      }

      setMessage("Horaires enregistrés avec succès.");
    } catch (error) {
      console.error("Erreur sauvegarde :", error);
      setMessage("Une erreur est survenue pendant l’enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto card-premium p-8">
              <p className="text-sm text-muted-foreground">
                Chargement des horaires...
              </p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Administration
                </p>
                <h1 className="text-2xl md:text-4xl font-bold font-heading">
                  Gestion des <span className="text-gradient">horaires</span>
                </h1>
              </div>

              <Link
                to="/admin"
                className="px-5 py-3 rounded-xl text-sm font-semibold border border-border/30 bg-card/60 hover:bg-card hover:shadow-premium transition-all duration-300"
              >
                Retour admin
              </Link>
            </div>

            <div className="card-premium p-6 md:p-8 space-y-6">
              {hours.map((hour) => (
                <div
                  key={hour.id}
                  className="border border-border/20 rounded-2xl p-5 space-y-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-bold font-heading">
                      {hour.day_label}
                    </h2>

                    <div className="flex items-center gap-4 text-sm">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={hour.is_closed}
                          onChange={(e) =>
                            handleChange(hour.id, "is_closed", e.target.checked)
                          }
                        />
                        Journée fermée
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={
                            !hour.open_morning &&
                            !hour.close_morning &&
                            !hour.is_closed
                          }
                          onChange={(e) =>
                            handleHalfDayToggle(
                              hour.id,
                              "morning",
                              e.target.checked
                            )
                          }
                        />
                        Matin fermé
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={
                            !hour.open_afternoon &&
                            !hour.close_afternoon &&
                            !hour.is_closed
                          }
                          onChange={(e) =>
                            handleHalfDayToggle(
                              hour.id,
                              "afternoon",
                              e.target.checked
                            )
                          }
                        />
                        Après-midi fermé
                      </label>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">
                        Ouverture matin
                      </label>
                      <input
                        type="time"
                        value={hour.open_morning ?? ""}
                        disabled={
                          hour.is_closed ||
                          (!hour.open_morning && !hour.close_morning)
                        }
                        onChange={(e) =>
                          handleChange(
                            hour.id,
                            "open_morning",
                            e.target.value || null
                          )
                        }
                        className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">
                        Fermeture matin
                      </label>
                      <input
                        type="time"
                        value={hour.close_morning ?? ""}
                        disabled={
                          hour.is_closed ||
                          (!hour.open_morning && !hour.close_morning)
                        }
                        onChange={(e) =>
                          handleChange(
                            hour.id,
                            "close_morning",
                            e.target.value || null
                          )
                        }
                        className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">
                        Ouverture après-midi
                      </label>
                      <input
                        type="time"
                        value={hour.open_afternoon ?? ""}
                        disabled={
                          hour.is_closed ||
                          (!hour.open_afternoon && !hour.close_afternoon)
                        }
                        onChange={(e) =>
                          handleChange(
                            hour.id,
                            "open_afternoon",
                            e.target.value || null
                          )
                        }
                        className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">
                        Fermeture après-midi
                      </label>
                      <input
                        type="time"
                        value={hour.close_afternoon ?? ""}
                        disabled={
                          hour.is_closed ||
                          (!hour.open_afternoon && !hour.close_afternoon)
                        }
                        onChange={(e) =>
                          handleChange(
                            hour.id,
                            "close_afternoon",
                            e.target.value || null
                          )
                        }
                        className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {message && (
                <div className="rounded-xl border border-border/20 bg-card/50 px-4 py-3 text-sm">
                  {message}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-premium px-6 py-3 rounded-xl text-sm disabled:opacity-70"
                >
                  {saving ? "Enregistrement..." : "Enregistrer les horaires"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminHours;