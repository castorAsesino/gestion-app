import Head from 'next/head';
import { Card, CardContent, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import styles from '../styles/Home.module.css';
import NotesIcon from '@material-ui/icons/Notes';
import WebIcon from '@material-ui/icons/Web';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import BuildIcon from '@material-ui/icons/Build';
import Link from 'next/link';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ListAltIcon from '@material-ui/icons/ListAlt';

export default function MenuEvaluacion() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div className="custom-card" style={{  margin: '20px' }}>
            <Link href="/evaluacion-calidad">
              <a className={styles.customLink}>
                <Card style={{ background: '#4576e0', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 50 }}>
                  <NotesIcon style={{ fontSize: 100 }} />
                  <CardContent>
                    <Typography variant="h6">Evaluar Calidad de Procesos</Typography>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </div>
          <div className="custom-card" style={{  margin: '8px' }}>
            <Link href="/evaluacion-capacidad">
              <a className={styles.customLink}>
                <Card style={{ background: '#4576e0', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 50 }}>
                  <ListAltIcon style={{ fontSize: 100 }} />
                  <CardContent>
                    <Typography variant="h6">Evaluar Capacidad de Procesos</Typography>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </div>

{/*           <div className="custom-card" style={{ flex: '0 0 calc(50% - 16px)', maxWidth: 'calc(50% - 16px)', margin: '8px' }}>
            <Link href="/user-storie">
              <a>
                <Card style={{ background: '#4576e0', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                  <AssignmentIndIcon style={{ fontSize: 100 }} />
                  <CardContent>
                    <Typography variant="h5">....</Typography>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </div>

          <div className="custom-card" style={{ flex: '0 0 calc(50% - 16px)', maxWidth: 'calc(50% - 16px)', margin: '8px' }}>
            <Link href="/review">
              <a>
                <Card style={{ background: '#4576e0', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                  <TrendingUpIcon style={{ fontSize: 100 }} />
                  <CardContent>
                    <Typography variant="h5">Review</Typography>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </div> */}
        </div>
      </main>
    </div>
  )
}
