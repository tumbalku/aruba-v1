import HeartBeats from "../icons/HeartBeats";

const SectionHeader = ({ text }) => {
  return (
    <>
      <div className="flex flex-row gap-1 items-center">
        <HeartBeats className="w-10 h-5 text-primary" strokeWidth={10} />
        <p className="text-primary font-medium">{text}</p>
      </div>
    </>
  );
};

export default SectionHeader;
