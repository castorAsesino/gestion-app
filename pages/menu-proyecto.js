/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head';
import { Card, CardContent, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import styles from '../styles/Home.module.css'
import NotesIcon from '@material-ui/icons/Notes';
import WebIcon from '@material-ui/icons/Web';
import CachedIcon from '@material-ui/icons/Cached';
import BuildIcon from '@material-ui/icons/Build';
import Link from 'next/link';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

export default function MenuProyecto() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div className="custom-card" style={{ flex: '0 0 calc(50% - 16px)', maxWidth: 'calc(50% - 16px)', margin: '8px' }}>
            <Link href="/asignar-roles">
              <a>
                <Card style={{ background: '#3f1477', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                  <PersonIcon style={{ fontSize: 100 }} />
                  <CardContent>
                    <Typography variant="h5">Ver Recursos asignados</Typography>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </div>
          <div className="custom-card" style={{ flex: '0 0 calc(50% - 16px)', maxWidth: 'calc(50% - 16px)', margin: '8px' }}>
            <Link href="/proyecto">
              <a>
                <Card style={{ background: '#3f1477', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                  <WebIcon style={{ fontSize: 100 }} />
                  <CardContent>
                    <Typography variant="h5">Ver Proyectos</Typography>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </div>

          <div className="custom-card" style={{ flex: '0 0 calc(50% - 16px)', maxWidth: 'calc(50% - 16px)', margin: '8px' }}>
            <Link href="/tarea">
              <a>
                <Card style={{ background: '#3f1477', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                  <LibraryBooksIcon style={{ fontSize: 100 }} />
                  <CardContent>
                    <Typography variant="h5">Ver Tareas</Typography>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </div>

        </div>
      </main>
    </div>
  )
}
