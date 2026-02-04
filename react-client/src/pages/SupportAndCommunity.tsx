const supportAndCommunityVM = {
  support: {
    title: "Support",
    paragraphs: [
      "CodoTyan is developed as an engineering-driven platform, and its support model reflects this approach.",
      "Support is focused on correctness, reproducibility, and clear problem definition rather than ad-hoc troubleshooting.",
      "Issues, bug reports, and improvement proposals are expected to be expressed in a structured and reproducible form, enabling deterministic analysis and resolution.",
      "Support channels prioritize transparency and traceability, ensuring that reported problems can be tracked, discussed, and resolved without ambiguity.",
    ],
  },

  community: {
    title: "Community",
    paragraphs: [
      "The CodoTyan community is centered around shared responsibility for content quality, system integrity, and long-term sustainability.",
      "Community discussions emphasize architectural decisions, editorial governance, and workflow invariants rather than superficial customization.",
      "Contributions are encouraged in the form of proposals, documented experiments, and clearly articulated feedback.",
      "The platform values signal over noise and favors deliberate, well-reasoned collaboration over rapid but unstructured interaction.",
    ],
  },
}

export default function SupportAndCommunity() {
  const { support, community } = supportAndCommunityVM

  return (
    <section className="flex flex-col gap-(--space-xl) prose">
      <section>
        <h1 className="text-xl font-bold">{support.title}</h1>

        <div className="mt-(--space-md) flex flex-col gap-(--space-md)">
          {support.paragraphs.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">{community.title}</h2>

        <div className="mt-(--space-md) flex flex-col gap-(--space-md)">
          {community.paragraphs.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>
      </section>
    </section>
  )
}
