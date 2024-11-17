import Head from 'next/head';
import { Card, CardContent, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import styles from '../styles/Home.module.css';
import NotesIcon from '@material-ui/icons/Notes';
import WebIcon from '@material-ui/icons/Web';
import CachedIcon from '@material-ui/icons/Cached';
import BuildIcon from '@material-ui/icons/Build';
import Link from 'next/link';
import MenuIcon from '@material-ui/icons/Menu';
import BarChartIcon from '@material-ui/icons/BarChart';
export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
  
          <div className="custom-card" style={{ flex: '0 0 calc(50% - 16px)', maxWidth: 'calc(50% - 16px)', margin: '8px' }}>
            <Link href="/proyecto">
              <a className={styles.customLink}>
                <Card style={{ background: '#4576e0', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                  <WebIcon style={{ fontSize: 100 }} />
                  <CardContent>
                    <Typography variant="h5">Administración</Typography>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </div>

          <div className="custom-card" style={{ flex: '0 0 calc(50% - 16px)', maxWidth: 'calc(50% - 16px)', margin: '8px' }}>
            <Link href="/menu-evaluacion">
              <a className={styles.customLink}>
                <Card style={{ background: '#4576e0', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                  <NotesIcon style={{ fontSize: 100 }} />
                  <CardContent>
                    <Typography variant="h5">Evaluación</Typography>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </div>
          <div className="custom-card" style={{ flex: '0 0 calc(50% - 16px)', maxWidth: 'calc(50% - 16px)', margin: '8px' }}>
            <Link href="/menu-evaluacion">
              <a className={styles.customLink}>
                <Card style={{ background: '#4576e0', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                  <BuildIcon style={{ fontSize: 100 }} />
                  <CardContent>
                    <Typography variant="h5">Configuración</Typography>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </div>

          <div className="custom-card" style={{ flex: '0 0 calc(50% - 16px)', maxWidth: 'calc(50% - 16px)', margin: '8px' }}>
            <Link href="/reportes">
              <a className={styles.customLink}>
                <Card style={{ background: '#4576e0', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                  <BarChartIcon style={{ fontSize: 100 }} />
                  <CardContent>
                    <Typography variant="h5">Reportes</Typography>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
