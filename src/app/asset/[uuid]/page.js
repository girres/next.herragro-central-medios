export default async function Page(props) {
  const { uuid = null } = props?.params || {};

  return (
    <div>
      <h1>This is a Asset resource</h1>
      <h2>{uuid}</h2>
    </div>
  );
}
