const AuthLayout = async (props: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <div className="ml-auto w-fit p-4"></div>
      <div className="flex-1 flex items-center justify-center">
        {props.children}
      </div>
    </div>
  );
};

export default AuthLayout;
