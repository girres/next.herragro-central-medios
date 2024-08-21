export default async function Page(props) {
  const { slug = null } = props?.params || {};

  return (
    <div>
      <h1>This is a Blog post</h1>
      <h2>{slug}</h2>
    </div>
  );
}
