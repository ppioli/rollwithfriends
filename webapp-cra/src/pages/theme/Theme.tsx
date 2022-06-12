export function ThemePage() {
  return (
    <div className={"container mx-auto"}>
      <h1>Theme</h1>
      <div className={"flex"}>
        <div className={"w-32 h-32 bg-light m-3 rounded-lg"}></div>
        <div className={"w-32 h-32 bg-primary m-3 rounded-lg"}></div>
        <div className={"w-32 h-32 bg-dark m-3 rounded-lg"}></div>
        <div className={"w-32 h-32 bg-darker m-3 rounded-lg"}></div>
      </div>

      <div className={"flex"}>
        <div className={"w-32 h-32 bg-gray-500 rounded-lg"}></div>
        <div className={"w-32 h-32 bg-gray-500 rounded-lg"}></div>
        <div className={"w-32 h-32 bg-gray-500 rounded-lg"}></div>
        <div className={"w-32 h-32 bg-gray-500 rounded-lg"}></div>
      </div>
    </div>
  );
}
