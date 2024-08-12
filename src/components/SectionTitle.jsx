const SectionTitle = ({ text, size }) => {
  return (
    <div className="border-b border-base-300 pb-5 mt-8">
      <h2 className={`capitalize ${size} font-medium tracking-wider`}>
        {text}
      </h2>
    </div>
  );
};

export default SectionTitle;
