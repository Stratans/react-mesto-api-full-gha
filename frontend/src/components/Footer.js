function Footer() {
  const currentYear = (new Date()).getFullYear()
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {`${currentYear} Млечный Путь в 41-м тысячелетии`}</p>
    </footer>
  );
};

export default Footer