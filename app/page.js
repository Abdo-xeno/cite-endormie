import HeroV2 from "../components/v2/HeroV2";
import ProblematicV2 from "../components/v2/ProblematicV2";
import Lexique from "../components/v2/Lexique";
import ConceptV2 from "../components/v2/ConceptV2";
import Personnages from "../components/Personnages";
import ActIntro from "../components/ActIntro";
import ActeGouvernants from "../components/v2/ActeGouvernants";
import ActeCitoyens from "../components/v2/ActeCitoyens";
import ActePacte from "../components/v2/ActePacte";
import SceauxV2 from "../components/v2/SceauxV2";
import SpiritualV2 from "../components/v2/SpiritualV2";
import Teaser from "../components/Teaser";
import Vision from "../components/Vision";
import FinaleV2 from "../components/v2/FinaleV2";
import EpilogueSageV2 from "../components/v2/EpilogueSageV2";
import CandleProgress from "../components/CandleProgress";
import AwakenOverlay from "../components/AwakenOverlay";
import TeamGardiens from "../components/v2/TeamGardiens";
import { SealsProvider } from "../components/SealsProvider";

export default function Home() {
  return (
    <SealsProvider>
      {/* Pas de seuil de nommage : l'équipe est « les Gardiens » d'emblée */}
      <TeamGardiens />
      <main className="relative z-10">
        <CandleProgress />
        <AwakenOverlay />

        {/* Mise en scène */}
        <HeroV2 />
        <ProblematicV2 />
        <Lexique />
        <ConceptV2 />
        <Personnages />

        {/* La démonstration en trois actes */}
        <ActIntro
          num="I"
          title="Les Gouvernants"
          line="L'état d'une société dépend d'abord de la main qui tient le gouvernail."
        />
        <ActeGouvernants />

        <ActIntro
          num="II"
          title="Les Citoyens"
          line="La première école d'une cité, c'est la famille."
        />
        <ActeCitoyens />

        <ActIntro
          num="III"
          title="Le Pacte"
          line="La responsabilité ne se divise pas — elle se co-porte."
        />
        <ActePacte />

        {/* L'épreuve → la question + sa réponse (adjacentes) → le projet → le cliffhanger */}
        <SceauxV2 />
        <SpiritualV2 />
        <FinaleV2 />
        <Teaser />
        <Vision />
        <EpilogueSageV2 />
      </main>
    </SealsProvider>
  );
}
