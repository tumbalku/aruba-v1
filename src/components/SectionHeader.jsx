const SectionHeader = ({ header, title }) => {
  return (
    <div className="py-2 space-y-4">
      <div>
        <div className="border-b-4 border-primary w-10 mb-1"></div>
        <p className="text-primary">{header}</p>
      </div>
      <h2 className="font-semibold text-2xl w-full">{title}</h2>
    </div>
  );
};

export default SectionHeader;
