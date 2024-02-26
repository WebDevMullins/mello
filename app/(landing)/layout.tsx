const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      {/* TODO: Add header */}
      <main className="bg-slate-100 pb-20 pt-40">{children}</main>
      {/* TODO: Add footer */}
    </div>
  );
};

export default LandingLayout;
