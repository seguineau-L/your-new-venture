const CircuitLoader = () => {
    const branches = [
        { d: "M150 150 H95 V90 H55", color: "orange", delay: "0s" },
        { d: "M150 150 H205 V90 H245", color: "blue", delay: "0.15s" },
        { d: "M150 150 H80 V150 H35", color: "blue", delay: "0.3s" },
        { d: "M150 150 H220 V150 H265", color: "orange", delay: "0.45s" },
        { d: "M150 150 H95 V210 H55", color: "orange", delay: "0.6s" },
        { d: "M150 150 H205 V210 H245", color: "blue", delay: "0.75s" },
        { d: "M150 150 V95 H120 V55", color: "blue", delay: "0.9s" },
        { d: "M150 150 V205 H180 V245", color: "orange", delay: "1.05s" },
    ];

    return (
        <div className="card-premium p-8 md:p-10 border-peach/20 min-h-[420px] flex items-center justify-center bg-card/50">
            <div className="flex flex-col items-center gap-6">
                <div className="relative w-[300px] h-[300px] rounded-2xl bg-background/30 border border-border/20 overflow-hidden">
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                        <defs>
                            <filter id="orangeGlow">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            <filter id="blueGlow">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {branches.map((branch, index) => {
                            const stroke =
                                branch.color === "orange" ? "#f08a3c" : "#38bdf8";
                            const glow =
                                branch.color === "orange"
                                    ? "url(#orangeGlow)"
                                    : "url(#blueGlow)";

                            return (
                                <g key={index}>
                                    <path
                                        d={branch.d}
                                        stroke={stroke}
                                        strokeWidth="3"
                                        fill="none"
                                        opacity="0.18"
                                    />

                                    <path
                                        d={branch.d}
                                        stroke={stroke}
                                        strokeWidth="3"
                                        fill="none"
                                        filter={glow}
                                        className="circuit-flow"
                                        style={{ animationDelay: branch.delay }}
                                    />

                                    <circle
                                        cx={
                                            branch.d.includes("H55")
                                                ? 55
                                                : branch.d.includes("H245")
                                                    ? 245
                                                    : branch.d.includes("H35")
                                                        ? 35
                                                        : branch.d.includes("H265")
                                                            ? 265
                                                            : branch.d.includes("V55")
                                                                ? 120
                                                                : 180
                                        }
                                        cy={
                                            branch.d.includes("V90")
                                                ? 90
                                                : branch.d.includes("V150")
                                                    ? 150
                                                    : branch.d.includes("V210")
                                                        ? 210
                                                        : branch.d.includes("V55")
                                                            ? 55
                                                            : 245
                                        }
                                        r="5"
                                        fill={stroke}
                                        filter={glow}
                                        className="circuit-node"
                                        style={{ animationDelay: branch.delay }}
                                    />
                                </g>
                            );
                        })}

                        <rect
                            x="123"
                            y="123"
                            width="54"
                            height="54"
                            rx="12"
                            fill="hsl(var(--card))"
                            stroke="hsl(var(--accent))"
                            strokeWidth="2"
                            filter="url(#orangeGlow)"
                        />

                        <path
                            d="M138 151 L148 161 L164 141"
                            stroke="#38bdf8"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            filter="url(#blueGlow)"
                        />
                    </svg>
                </div>

                <p className="text-sm font-semibold tracking-wide text-muted-foreground">
                    Chargement des tarifs...
                </p>
            </div>
        </div>
    );
};

export default CircuitLoader;