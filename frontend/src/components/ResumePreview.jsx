import ModernTemplate from "../templates/ModernTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";

const ResumePreview = ({
  resume,
  template,
}) => {
  if (!resume) return null;

  if (template === "minimal") {
    return (
      <MinimalTemplate
        resume={resume}
      />
    );
  }

  if (
    template ===
    "professional"
  ) {
    return (
      <ProfessionalTemplate
        resume={resume}
      />
    );
  }

  return (
    <ModernTemplate
      resume={resume}
    />
  );
};

export default ResumePreview;