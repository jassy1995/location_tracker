function NoData({ children }) {
  const styleLoader = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "fixed",
    left: "0px",
    top: "268px",
    width: "100%",
    height: "32%",
  };
  return (
    <div style={styleLoader} className="fs-3">
      <div className="pl-4 ml-4 font-bold text-slate-400 text-2xl">
        {children}
      </div>
    </div>
  );
}

export default NoData;
