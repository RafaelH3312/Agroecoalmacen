import stylesDesk from './FooterDesktop.module.css';
import stylesMob from './FooterMobile.module.css';
import { useResponsive } from '../../hooks/useResponsive';

export default function Footer() {
  const isMobile = useResponsive();
  const styles = isMobile ? stylesMob : stylesDesk;

  return (
    <footer className={styles.footer}>
      <h6>RAFAEL ANTONIO PALMAR HERNANDEZ</h6>
    </footer>
  );
}
