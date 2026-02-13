
import { Level, Problem } from './types';

export const PROBLEMS_DATABASE: Problem[] = [
  {
    id: 'm1',
    level: Level.MITJA,
    enunciat: "En un formiguer hi ha 125 formigues. Si 42 surten a buscar menjar i després en tornen 15, quantes formigues hi ha ara al formiguer?",
    solucioIdeal: "125 - 42 + 15 = 98 formigues. Dades clau: 125 inicials, 42 marxen, 15 tornen."
  },
  {
    id: 'm2',
    level: Level.MITJA,
    enunciat: "La Maria té 3 paquets de caramels. Cada paquet té 12 caramels. Si en reparteix 10 entre els seus amics, quants caramels li queden?",
    solucioIdeal: "3 * 12 = 36; 36 - 10 = 26 caramels. Dades: 3 paquets, 12 per paquet, 10 repartits."
  },
  {
    id: 's1',
    level: Level.SUPERIOR,
    enunciat: "Un dipòsit d'aigua té una capacitat de 1.500 litres. Al matí s'han buidat les dues cinquenes parts (2/5) i a la tarda s'han afegit 250 litres. Quanta aigua hi ha ara al dipòsit?",
    solucioIdeal: "1500 * (2/5) = 600 buidats; 1500 - 600 = 900; 900 + 250 = 1150 litres."
  },
  {
    id: 's2',
    level: Level.SUPERIOR,
    enunciat: "Volem comprar 12 pilotes de futbol que costen 15,50 € cada una. Si la botiga ens fa un descompte total de 20 €, quant haurem de pagar finalment?",
    solucioIdeal: "12 * 15,50 = 186; 186 - 20 = 166 €. Dades: 12 unitats, preu unitari 15,50, descompte fix 20."
  },
  {
    id: 'e11',
    level: Level.ESO1,
    enunciat: "En una classe de 30 alumnes, el 60% són noies. Si 5 noies i 2 nois marxen d'excursió, quin és el percentatge de nois que es queden a la classe?",
    solucioIdeal: "Noies: 0,6 * 30 = 18. Nois: 30 - 18 = 12. Marxen 2 nois, en queden 10. Total restants: 30 - 7 = 23. % Nois = (10/23) * 100 ≈ 43,48%."
  },
  {
    id: 'e12',
    level: Level.ESO1,
    enunciat: "Calcula l'àrea d'una figura composta per un quadrat de 5 cm de costat i un triangle equilàter a sobre d'un dels seus costats.",
    solucioIdeal: "Àrea quadrat = 5^2 = 25 cm². Àrea triangle = (b * h) / 2. Altura triangle (Pitàgores) = sqrt(5^2 - 2,5^2) ≈ 4,33. Àrea triangle = (5 * 4,33) / 2 ≈ 10,825. Àrea total ≈ 35,825 cm²."
  },
  {
    id: 'e21',
    level: Level.ESO2,
    enunciat: "El preu d'un ordinador és de 800 € sense IVA. Si s'hi aplica un IVA del 21% i després una rebaixa del 15%, quin és el preu final de l'ordinador?",
    solucioIdeal: "Preu amb IVA: 800 * 1,21 = 968 €. Preu amb descompte: 968 * 0,85 = 822,80 €."
  },
  {
    id: 'e22',
    level: Level.ESO2,
    enunciat: "Resol el següent problema mitjançant una equació: La suma de tres nombres consecutius és 72. Quins són aquests nombres?",
    solucioIdeal: "x + (x+1) + (x+2) = 72; 3x + 3 = 72; 3x = 69; x = 23. Els nombres són 23, 24 i 25."
  }
];
