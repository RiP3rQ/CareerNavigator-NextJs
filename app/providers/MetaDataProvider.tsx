interface HeadingProps {
  title: string;
  description: string;
}

const MetaDataProvider: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
    </>
  );
};

export default MetaDataProvider;
