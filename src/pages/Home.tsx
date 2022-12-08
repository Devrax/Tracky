import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import mapboxgl from 'mapbox-gl';
import { useEffect, useState } from 'react';
import TrackingMap from '../components/TrackingMap';
import './Home.css';
import { Geolocation } from '@awesome-cordova-plugins/geolocation';

const Home: React.FC = () => {

  const [initialLocation, setInitialLocation] = useState<null | Partial<mapboxgl.MapboxOptions>>(null);

  useEffect(() => {
    Geolocation.getCurrentPosition({enableHighAccuracy: true}).then(({ coords }) => {
        setInitialLocation({
          zoom: 14,
          center: {
            lat: coords.latitude,
            lon: coords.longitude
          }
        })
      })

  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar> 
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        { initialLocation ? <TrackingMap mapOptions={initialLocation} /> : null}

      </IonContent>
    </IonPage>
  );
};

export default Home;
