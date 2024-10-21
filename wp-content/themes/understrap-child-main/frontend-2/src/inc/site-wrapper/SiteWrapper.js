const SiteWrapper = ({children}) => {
  return (
    <>
      <div className="container">
        <h2>Wrapper</h2>
        {children}
      </div>
    </>
  )
}

export default SiteWrapper;
