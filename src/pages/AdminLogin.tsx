import { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage("Connexion impossible. Vérifie ton email et ton mot de passe.");
      setLoading(false);
      return;
    }

    setIsLoggedIn(true);
    setLoading(false);
  };

  if (isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto card-premium p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold font-heading">
                Connexion <span className="text-gradient">Admin</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-3">
                Accès réservé à la gestion du site.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email admin"
                  className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                  required
                />
              </div>

              {errorMessage && (
                <div className="rounded-xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-premium w-full py-3 rounded-xl text-sm disabled:opacity-70"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminLogin;