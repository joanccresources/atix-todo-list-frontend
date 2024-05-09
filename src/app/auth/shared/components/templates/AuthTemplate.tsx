interface IProps {
  children: React.ReactNode;
}
export const AuthTemplate = ({ children }: IProps) => {
  return (
    <main className="mt-5">
      <div className="container">
        <div className="max-w-screen-sm mx-auto">{children}</div>
      </div>
    </main>
  );
};
