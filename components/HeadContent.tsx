interface HeadContentProps {
  title: string;
  content?: string;
}

const HeadContent = ({ title, content }: HeadContentProps) => {
  return (
    <div className="space-y-4">
      <h1 className="text-amber-800 font-semibold text-2xl text-center">
        {title}
      </h1>
      {content ? <p className="text-center">{content}</p> : null}
    </div>
  );
};

export default HeadContent;
