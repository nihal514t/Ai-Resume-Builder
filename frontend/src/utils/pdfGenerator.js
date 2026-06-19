import jsPDF from "jspdf";

export const generateResumePDF = (
  resume
) => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);

  doc.text(
    resume.fullName || "",
    20,
    y
  );

  y += 10;

  doc.setFontSize(12);

  doc.text(
    resume.email || "",
    20,
    y
  );

  y += 8;

  doc.text(
    resume.phone || "",
    20,
    y
  );

  y += 8;

  doc.text(
    resume.location || "",
    20,
    y
  );

  y += 15;

  doc.setFontSize(16);

  doc.text(
    "Professional Summary",
    20,
    y
  );

  y += 10;

  doc.setFontSize(12);

  const summaryLines =
    doc.splitTextToSize(
      resume.summary || "",
      170
    );

  doc.text(
    summaryLines,
    20,
    y
  );

  y +=
    summaryLines.length * 7 +
    10;

  doc.setFontSize(16);

  doc.text(
    "Skills",
    20,
    y
  );

  y += 10;

  doc.setFontSize(12);

  doc.text(
    resume.skills.join(", "),
    20,
    y
  );

  y += 15;

  doc.setFontSize(16);

  doc.text(
    "Projects",
    20,
    y
  );

  y += 10;

  resume.projects.forEach(
    (project) => {
      doc.setFontSize(13);

      doc.text(
        project.title,
        20,
        y
      );

      y += 8;

      doc.setFontSize(11);

      const lines =
        doc.splitTextToSize(
          project.description,
          170
        );

      doc.text(
        lines,
        20,
        y
      );

      y +=
        lines.length * 7 + 10;
    }
  );

  doc.save(
    "resume.pdf"
  );
};