import type { IllusionDef } from "./types";
import { HermannGridIllusion } from "./hermann-grid";
import { ScintillatingGridIllusion } from "./scintillating-grid";
import { CafeWallIllusion } from "./cafe-wall";
import { ZollnerIllusion } from "./zollner-illusion";
import { PonzoIllusion } from "./ponzo-illusion";
import { MullerLyerIllusion } from "./muller-lyer";
import { EbbinghausIllusionIllusion } from "./ebbinghaus-illusion";
import { CheckerShadowIllusion } from "./checker-shadow";
import { PenroseTriangleIllusion } from "./penrose-triangle";
import { PenroseStairsIllusion } from "./penrose-stairs";
import { NeckerCubeIllusion } from "./necker-cube";
import { RotatingSnakesIllusion } from "./rotating-snakes";
import { OuchiIllusionIllusion } from "./ouchi-illusion";
import { TroxlerFadeIllusion } from "./troxler-fade";
import { HypnoSpiralIllusion } from "./hypno-spiral";
import { MotionAftereffectIllusion } from "./motion-aftereffect";
import { AutokineticDotIllusion } from "./autokinetic-dot";
import { AfterimageFlashIllusion } from "./afterimage-flash";
import { BarberpoleIllusionIllusion } from "./barberpole-illusion";
import { BreathingCircleIllusion } from "./breathing-circle";
import { MunkerIllusion } from "./munker-illusion";
import { ChubbIllusionIllusion } from "./chubb-illusion";
import { ChromostereopsisIllusion } from "./chromostereopsis";

/**
 * Central manifest for the "gipnos" secret-terminal easter egg.
 * Copy (title/instruction/effect) lives here — illusion components stay
 * pure-visual and self-contained. Order here is display order in the grid.
 */
export const ILLUSIONS: IllusionDef[] = [
  {
    id: "hermann-grid",
    title: { uz: "Hermann Panjarasi", en: "Hermann Grid" },
    instruction: {
      uz: "Panjaraning istalgan bir nuqtasiga tik qarab turing.",
      en: "Fixate on any single point of the grid.",
    },
    effect: {
      uz: "Oq chiziqlar kesishgan joylarda kulrang \u2018arvoh\u2019 nuqtalar chaqnaydi \u2014 faqat chekka ko'rishda.",
      en: "Ghostly grey blobs flicker at the white intersections \u2014 visible only in peripheral vision.",
    },
    duration: 15,
    Component: HermannGridIllusion,
  },
  {
    id: "scintillating-grid",
    title: { uz: "Yaltilovchi Panjara", en: "Scintillating Grid" },
    instruction: {
      uz: "Bir nuqtaga tikilib, qolganlarini chekka ko'z bilan kuzating.",
      en: "Stare at one dot and watch the rest with peripheral vision.",
    },
    effect: {
      uz: "Kulrang nuqtalar kesishmalarda qora bo'lib chirsillab ko'rinadi.",
      en: "Grey dots seem to scintillate black at the intersections.",
    },
    duration: 15,
    Component: ScintillatingGridIllusion,
  },
  {
    id: "cafe-wall",
    title: { uz: "Kafe Devori", en: "Café Wall" },
    instruction: { uz: "Rasmni bir zum tomosha qiling.", en: "Just look at the pattern." },
    effect: {
      uz: "Gorizontal chiziqlar to'g'ri \u2014 ammo qiyshiq bo'lib ko'rinadi.",
      en: "The horizontal lines are perfectly straight \u2014 yet they look wedged and tilted.",
    },
    duration: 10,
    Component: CafeWallIllusion,
  },
  {
    id: "zollner-illusion",
    title: { uz: "Zollner Chizig'i", en: "Zöllner Illusion" },
    instruction: { uz: "Uzun chiziqlarni kuzating.", en: "Trace the long lines with your eyes." },
    effect: {
      uz: "Parallel chiziqlar bir-biriga yaqinlashib yoki uzoqlashayotganday tuyuladi.",
      en: "The perfectly parallel lines appear to converge and diverge.",
    },
    duration: 10,
    Component: ZollnerIllusion,
  },
  {
    id: "ponzo-illusion",
    title: { uz: "Ponzo Illyuziyasi", en: "Ponzo Illusion" },
    instruction: { uz: "Ikki qizil chiziqni solishtiring.", en: "Compare the two red bars." },
    effect: {
      uz: "Ular bir xil uzunlikda \u2014 ammo yuqoridagisi uzunroq ko'rinadi.",
      en: "They are pixel-identical in length \u2014 the upper one looks longer.",
    },
    duration: 8,
    Component: PonzoIllusion,
  },
  {
    id: "muller-lyer",
    title: { uz: "Myuller-Layer Illyuziyasi", en: "Müller-Lyer Illusion" },
    instruction: { uz: "Chiziqlarning uzunligini baholang.", en: "Judge the length of each line." },
    effect: {
      uz: "Barchasi bir xil uzunlikda \u2014 uchidagi \u2018qanotlar\u2019 sizni aldaydi.",
      en: "All segments are equal \u2014 the end \u2018fins\u2019 fool your judgment.",
    },
    duration: 8,
    Component: MullerLyerIllusion,
  },
  {
    id: "ebbinghaus-illusion",
    title: { uz: "Ebbingauz Illyuziyasi", en: "Ebbinghaus Illusion" },
    instruction: {
      uz: "Ikki markaziy doirani solishtiring.",
      en: "Compare the two central circles.",
    },
    effect: {
      uz: "Ikkisi ham bir xil o'lchamda \u2014 atrofdagilar ularni aldaydi.",
      en: "Both are the same size \u2014 the surrounding circles distort your perception.",
    },
    duration: 8,
    Component: EbbinghausIllusionIllusion,
  },
  {
    id: "checker-shadow",
    title: { uz: "Shaxmat Soyasi", en: "Checker Shadow" },
    instruction: {
      uz: "Belgilangan ikki katakchaga qarang.",
      en: "Look at the two marked squares.",
    },
    effect: {
      uz: "Ular pikselgacha bir xil kulrang \u2014 soyaga ishonmang.",
      en: "They are the exact same grey, pixel for pixel \u2014 don't trust the shadow.",
    },
    duration: 10,
    Component: CheckerShadowIllusion,
  },
  {
    id: "penrose-triangle",
    title: { uz: "Penrouz Uchburchagi", en: "Penrose Triangle" },
    instruction: { uz: "Shaklni har tomondan kuzating.", en: "Trace each beam with your eyes." },
    effect: {
      uz: "Bu shakl 3D dunyoda hech qachon mavjud bo'la olmaydi.",
      en: "This object could never physically exist in 3D.",
    },
    duration: 8,
    Component: PenroseTriangleIllusion,
  },
  {
    id: "penrose-stairs",
    title: { uz: "Penrouz Zinapoyasi", en: "Penrose Stairs" },
    instruction: { uz: "Zinapoyani aylanib chiqing.", en: "Follow the staircase around." },
    effect: {
      uz: "Zinapoya doim yuqoriga ko'tariladi \u2014 va hech qachon balandroqqa chiqmaydi.",
      en: "It endlessly climbs upward \u2014 yet never actually gets any higher.",
    },
    duration: 8,
    Component: PenroseStairsIllusion,
  },
  {
    id: "necker-cube",
    title: { uz: "Nekker Kubi", en: "Necker Cube" },
    instruction: { uz: "Kub ustiga bosib ko'ring.", en: "Tap the cube." },
    effect: {
      uz: "Miyangiz uni ikki xil tomondan ko'rishga qaror qiladi \u2014 tanlov sizniki.",
      en: "Your brain flips between two valid 3D readings \u2014 you decide which.",
    },
    duration: 10,
    Component: NeckerCubeIllusion,
  },
  {
    id: "rotating-snakes",
    title: { uz: "Aylanuvchi Ilonlar", en: "Rotating Snakes" },
    instruction: {
      uz: "Rasmning o'ziga emas, atrofiga qarang.",
      en: "Don't stare directly \u2014 let your eyes wander around it.",
    },
    effect: {
      uz: "Rasm 100% statik \u2014 lekin chekka ko'rishda aylanayotganday tuyuladi.",
      en: "The image is 100% static \u2014 yet it appears to spin in peripheral vision.",
    },
    duration: 12,
    Component: RotatingSnakesIllusion,
  },
  {
    id: "ouchi-illusion",
    title: { uz: "Ouchi Illyuziyasi", en: "Ouchi Illusion" },
    instruction: {
      uz: "Sichqonchani (yoki ko'zingizni) harakatlantiring.",
      en: "Move your cursor \u2014 or just your eyes.",
    },
    effect: {
      uz: "Ichki doira atrofidan mustaqil suzayotganday ko'rinadi.",
      en: "The inner disc seems to float independently of its surroundings.",
    },
    duration: 10,
    Component: OuchiIllusionIllusion,
  },
  {
    id: "troxler-fade",
    title: { uz: "Troxler So'nishi", en: "Troxler Fading" },
    instruction: {
      uz: "Markazdagi nuqtaga 20 soniya tik qarab turing \u2014 ko'zingizni siljitmang.",
      en: "Stare at the center dot for 20s \u2014 don't move your eyes.",
    },
    effect: {
      uz: "Atrofdagi rang dog'lari asta-sekin ko'zdan g'oyib bo'ladi.",
      en: "The colored blobs around it slowly fade from awareness.",
    },
    duration: 20,
    Component: TroxlerFadeIllusion,
  },
  {
    id: "hypno-spiral",
    title: { uz: "Gipnoz Spirali", en: "Hypno Spiral" },
    instruction: { uz: "Markazga tikilib turing.", en: "Fix your gaze on the center." },
    effect: {
      uz: "Spiral sizni ichiga tortayotganday \u2014 to'xtaganda dunyo bir lahza \u2018kengayadi\u2019.",
      en: "It feels like it's pulling you in \u2014 look away after and the world briefly \u2018expands\u2019.",
    },
    duration: 15,
    Component: HypnoSpiralIllusion,
  },
  {
    id: "motion-aftereffect",
    title: { uz: "Sharsharadagi Harakat", en: "Motion Aftereffect" },
    instruction: {
      uz: "Markazga 15 soniya qarab, so'ng boshqa biror joyga qarang.",
      en: "Stare at the center for 15s, then glance somewhere else.",
    },
    effect: {
      uz: "To'xtagach, atrofdagi qimirlamas narsalar teskari tomonga siljiyotganday tuyuladi.",
      en: "Static objects nearby seem to drift in the opposite direction.",
    },
    duration: 15,
    Component: MotionAftereffectIllusion,
  },
  {
    id: "autokinetic-dot",
    title: { uz: "Adashgan Nuqta", en: "Autokinetic Dot" },
    instruction: { uz: "Nuqtadan ko'zingizni uzmang.", en: "Don't take your eyes off the dot." },
    effect: {
      uz: "Qorong'ilikdagi qimirlamas nuqta o'zi sayr qilayotganday tuyula boshlaydi.",
      en: "A perfectly still point of light starts to seem like it's wandering in the dark.",
    },
    duration: 20,
    Component: AutokineticDotIllusion,
  },
  {
    id: "afterimage-flash",
    title: { uz: "Rang Arvohi", en: "Afterimage Ghost" },
    instruction: {
      uz: "Rasmga 7 soniya tik qarab, keyin bo'sh ekranga qarab turing.",
      en: "Stare at the shape for 7s, then keep looking at the blank frame.",
    },
    effect: {
      uz: "Haqiqiy rangdagi \u2018arvoh\u2019 tasvir bo'sh ekranda bir lahza paydo bo'ladi.",
      en: "A true-colored ghost image briefly appears on the blank frame.",
    },
    duration: 11,
    Component: AfterimageFlashIllusion,
  },
  {
    id: "barberpole-illusion",
    title: { uz: "Sartaroshxona Ustuni", en: "Barber Pole" },
    instruction: {
      uz: "Chiziqlarning yo'nalishini kuzating.",
      en: "Watch which way the stripes travel.",
    },
    effect: {
      uz: "Chiziqlar diagonal harakatlanadi \u2014 lekin yuqoriga ko'tarilayotganday ko'rinadi.",
      en: "The stripes move diagonally \u2014 yet they appear to travel straight upward.",
    },
    duration: 10,
    Component: BarberpoleIllusionIllusion,
  },
  {
    id: "breathing-circle",
    title: { uz: "Nafas Olayotgan Doira", en: "Breathing Circle" },
    instruction: { uz: "Markazdagi doiraga qarab turing.", en: "Watch the circle at the center." },
    effect: {
      uz: "Doira hech qachon o'lchamini o'zgartirmaydi \u2014 faqat atrofidagi nurlar \u2018nafas oladi\u2019.",
      en: "The circle's size never actually changes \u2014 only the rays around it \u2018breathe\u2019.",
    },
    duration: 10,
    Component: BreathingCircleIllusion,
  },
  {
    id: "munker-illusion",
    title: { uz: "Munker Rang Illyuziyasi", en: "Munker Illusion" },
    instruction: {
      uz: "Ikki guruh doiraning rangini solishtiring.",
      en: "Compare the color of the two groups of circles.",
    },
    effect: {
      uz: "Barcha doiralar aynan bir xil rangda \u2014 ustidagi chiziqlar ularni aldaydi.",
      en: "Every circle is the exact same color \u2014 the overlaid stripes trick your eyes.",
    },
    duration: 8,
    Component: MunkerIllusion,
  },
  {
    id: "chubb-illusion",
    title: { uz: "Kontrast Illyuziyasi", en: "Simultaneous Contrast" },
    instruction: {
      uz: "Ikki markaziy kvadratni solishtiring.",
      en: "Compare the two central squares.",
    },
    effect: {
      uz: "Ikkisi ham bir xil kulrang \u2014 atrofi ularni aldaydi.",
      en: "Both are the identical shade of grey \u2014 their surroundings deceive you.",
    },
    duration: 8,
    Component: ChubbIllusionIllusion,
  },
  {
    id: "chromostereopsis",
    title: { uz: "Rang Chuqurligi", en: "Chromostereopsis" },
    instruction: { uz: "Shakllarga tik qarab turing.", en: "Fixate on the shapes." },
    effect: {
      uz: "Qizil rang oldinga chiqib, ko'k rang orqaga tortilganday ko'rinadi.",
      en: "Red appears to pop forward while blue seems to recede \u2014 pure optics, not design.",
    },
    duration: 8,
    Component: ChromostereopsisIllusion,
  },
];
