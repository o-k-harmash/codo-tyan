const aboutVM = {
  intro: {
    title: "Introduction",
    paragraphs: [
      "CodoTyan is conceived as a multi-tier editorial and publishing platform engineered to enforce consistency, traceability, and structural integrity across the entire lifecycle of technical content.",
      "Unlike conventional CMS solutions that treat the database as the primary source of truth, CodoTyan establishes Git as the single authoritative source for all textual materials.",
      "Each article, revision, and editorial change is anchored to a specific Git commit, enabling deterministic publication workflows and guaranteeing full reproducibility of any published version.",
      "The platform formalizes the editorial lifecycle by explicitly separating responsibilities between users, authors, editors, and administrators, each operating under clearly defined behavioral constraints.",
    ],
  },

  goals: {
    title: "Product Goals",
    description:
      "The primary objective of CodoTyan is to create a controlled, verifiable, and transparent environment for technical content production.",

    items: [
      {
        title: "Guaranteeing Epistemic Stability",
        text: "Every published article corresponds to a specific Git commit hash, ensuring deterministic reconstruction, immutable history, and explicit content provenance.",
      },
      {
        title: "Formalizing Editorial Governance",
        text: "Role-based constraints define who may perform specific actions and under what conditions, introducing accountability and minimizing accidental or unauthorized changes.",
      },
      {
        title: "Maintaining System-Wide Consistency",
        text: "All changes propagate through the platform via an event-driven synchronization mechanism, preventing silent divergence between Git state and published state.",
      },
      {
        title: "Supporting Structured Long-Term Growth",
        text: "A modular architecture composed of isolated contexts enables incremental evolution without violating established invariants or destabilizing existing workflows.",
      },
    ],
  },
}

export default function About() {
  const { intro, goals } = aboutVM

  return (
    <section className="flex flex-col gap-(--space-xl) prose">
      <section>
        <h1 className="text-xl font-bold">{intro.title}</h1>

        <div className="mt-(--space-md) flex flex-col gap-(--space-md)">
          {intro.paragraphs.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">{goals.title}</h2>

        <p className="mt-(--space-sm)">{goals.description}</p>

        <ul className="mt-(--space-md) flex flex-col gap-(--space-md)">
          {goals.items.map((item) => (
            <li key={item.title}>
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-(--space-xs)">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
