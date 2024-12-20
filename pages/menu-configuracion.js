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

export default function MenuProceso() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

        <div className="custom-card" style={{ flex: '0 0 calc(50% - 16px)', maxWidth: 'calc(50% - 16px)', margin: '8px' }}>
            <Link href="/proyecto">
              
                <Card style={{ background: '#4576e0', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                  <ListAltIcon style={{ fontSize: 100 }} />
                  <CardContent>
                    <Typography variant="h5">Proyectos</Typography>
                  </CardContent>
                </Card>
              
            </Link>
          </div>

          <div className="custom-card" style={{ flex: '0 0 calc(50% - 16px)', maxWidth: 'calc(50% - 16px)', margin: '8px' }}>
            <Link href="/proceso">
              
                <Card style={{ background: '#4576e0', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                  <NotesIcon style={{ fontSize: 100 }} />
                  <CardContent>
                    <Typography variant="h5">Procesos</Typography>
                  </CardContent>
                </Card>
              
            </Link>
          </div>
          

          <div className="custom-card" style={{ flex: '0 0 calc(50% - 16px)', maxWidth: 'calc(50% - 16px)', margin: '8px' }}>
            <Link href="/atributos">
              
                <Card style={{ background: '#4576e0', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                  <AssignmentIndIcon style={{ fontSize: 100 }} />
                  <CardContent>
                    <Typography variant="h5">Atributos de Proceso</Typography>
                  </CardContent>
                </Card>
              
            </Link>
          </div>

         { /* <div className="custom-card" style={{ flex: '0 0 calc(50% - 16px)', maxWidth: 'calc(50% - 16px)', margin: '8px' }}>
            <Link href="/review">
              
                <Card style={{ background: '#4576e0', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                  <TrendingUpIcon style={{ fontSize: 100 }} />
                  <CardContent>
                    <Typography variant="h5">Review</Typography>
                  </CardContent>
                </Card>
              
            </Link>
          </div> */}
        </div>
      </main>
    </div>
  )
}
