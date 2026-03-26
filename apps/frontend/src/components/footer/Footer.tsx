import './Footer.css';

export default function Footer() {
  return (
    <footer className="app-footer">
      <p>Created by: Dilpreet Singh, Hasrat, Ranjot</p>
      <p>&copy; {new Date().getFullYear()} Recipe Management System</p>
    </footer>
  );
}