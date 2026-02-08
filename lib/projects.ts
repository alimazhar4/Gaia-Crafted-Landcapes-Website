export interface Project {
	id: string;
	title: string;
	imageBefore: string;
	imageAfter: string;
	cardTheme: "plum" | "sage";
}

export const projects: Project[] = [
	{ id: "abergavenny-2", title: "Abergavenny Bob & Carole Image 2", imageBefore: "/Abergavenny Bob & Carole/Before2.JPG", imageAfter: "/Abergavenny Bob & Carole/After2.JPG", cardTheme: "plum" },
	{ id: "abergavenny-3", title: "Abergavenny Bob & Carole Image 3", imageBefore: "/Abergavenny Bob & Carole/Before3.JPG", imageAfter: "/Abergavenny Bob & Carole/After3.JPG", cardTheme: "sage" },
	{ id: "caldicot-1", title: "Caldicot Image 1", imageBefore: "/Caldicot/Before1.JPG", imageAfter: "/Caldicot/After1.JPG", cardTheme: "plum" },
	{ id: "caldicot-2", title: "Caldicot Image 2", imageBefore: "/Caldicot/Before2.JPG", imageAfter: "/Caldicot/After2.JPG", cardTheme: "sage" },
	{ id: "caldicot-3", title: "Caldicot Image 3", imageBefore: "/Caldicot/Before3.JPG", imageAfter: "/Caldicot/After3.JPG", cardTheme: "plum" },
	{ id: "caldicot-5", title: "Caldicot Image 5", imageBefore: "/Caldicot/Before5.JPG", imageAfter: "/Caldicot/After5.JPG", cardTheme: "sage" },
	{ id: "catbrook-2", title: "Catbrook Image 2", imageBefore: "/Catbrook/Before2.JPG", imageAfter: "/Catbrook/After2.JPG", cardTheme: "plum" },
	{ id: "catbrook-3", title: "Catbrook Image 3", imageBefore: "/Catbrook/Before3.JPG", imageAfter: "/Catbrook/After3.JPG", cardTheme: "sage" },
	{ id: "chepstow-fc-2", title: "Chepstow Finches Close Image 2", imageBefore: "/Chepstow Finches Close/Before2.JPG", imageAfter: "/Chepstow Finches Close/After2.JPG", cardTheme: "plum" },
	{ id: "chepstow-slp-1", title: "Chepstow St Laurence Park Image 1", imageBefore: "/Chepstow St Laurence Park/Before1.JPG", imageAfter: "/Chepstow St Laurence Park/After1.JPG", cardTheme: "sage" },
	{ id: "chepstow-slp-2", title: "Chepstow St Laurence Park Image 2", imageBefore: "/Chepstow St Laurence Park/Before2.JPG", imageAfter: "/Chepstow St Laurence Park/After2.JPG", cardTheme: "plum" },
	{ id: "chepstow-slp-3", title: "Chepstow St Laurence Park Image 3", imageBefore: "/Chepstow St Laurence Park/Before3.JPG", imageAfter: "/Chepstow St Laurence Park/After3.JPG", cardTheme: "sage" },
	{ id: "chepstow-slp-4", title: "Chepstow St Laurence Park Image 4", imageBefore: "/Chepstow St Laurence Park/Before4.JPG", imageAfter: "/Chepstow St Laurence Park/After4.JPG", cardTheme: "plum" },
	{ id: "coleford-1", title: "Coleford Image 1", imageBefore: "/Coleford/Before1.JPG", imageAfter: "/Coleford/After1.JPG", cardTheme: "sage" },
	{ id: "coleford-2", title: "Coleford Image 2", imageBefore: "/Coleford/Before2.JPG", imageAfter: "/Coleford/After2.JPG", cardTheme: "plum" },
	{ id: "llanmartin-2", title: "Llanmartin Image 2", imageBefore: "/Llanmartin/Before2.JPG", imageAfter: "/Llanmartin/After2.JPG", cardTheme: "sage" },
	{ id: "llanmartin-3", title: "Llanmartin Image 3", imageBefore: "/Llanmartin/Before3.JPG", imageAfter: "/Llanmartin/After3.JPG", cardTheme: "plum" },
	{ id: "llanwern-1", title: "Llanwern Image 1", imageBefore: "/Llanwern/Before1.JPG", imageAfter: "/Llanwern/After1.JPG", cardTheme: "sage" },
	{ id: "llanwern-2", title: "Llanwern Image 2", imageBefore: "/Llanwern/Before2.JPG", imageAfter: "/Llanwern/After2.JPG", cardTheme: "plum" },
	{ id: "lydney-1", title: "Lydney Image 1", imageBefore: "/Lydney/Before1.JPG", imageAfter: "/Lydney/After1.JPG", cardTheme: "sage" },
	{ id: "portskewett-1", title: "Portskewett Image 1", imageBefore: "/Portskewett/Before1.JPG", imageAfter: "/Portskewett/After1.jpg", cardTheme: "plum" },
	{ id: "ross-1", title: "Ross On Wye Image 1", imageBefore: "/Ross On Wye/Before1.JPG", imageAfter: "/Ross On Wye/After1.JPG", cardTheme: "sage" },
	{ id: "ross-2", title: "Ross On Wye Image 2", imageBefore: "/Ross On Wye/Before2.JPG", imageAfter: "/Ross On Wye/After2.JPG", cardTheme: "plum" },
	{ id: "ross-3", title: "Ross On Wye Image 3", imageBefore: "/Ross On Wye/Before3.JPG", imageAfter: "/Ross On Wye/After3.JPG", cardTheme: "sage" },
	{ id: "ross-4", title: "Ross On Wye Image 4", imageBefore: "/Ross On Wye/Before4.JPG", imageAfter: "/Ross On Wye/After4.JPG", cardTheme: "plum" },
	{ id: "st-arvans-1", title: "St Arvans Image 1", imageBefore: "/St Arvans/Before1.JPG", imageAfter: "/St Arvans/After1.JPG", cardTheme: "sage" },
	{ id: "st-nicholas-1", title: "St Nicholas Image 1", imageBefore: "/St Nicholas/Before1.jpeg", imageAfter: "/St Nicholas/After1.JPG", cardTheme: "plum" },
	{ id: "thornbury-1", title: "Thornbury Image 1", imageBefore: "/Thornbury/Before1.JPG", imageAfter: "/Thornbury/After1.JPG", cardTheme: "sage" },
	{ id: "thornbury-2", title: "Thornbury Image 2", imageBefore: "/Thornbury/Before2.JPG", imageAfter: "/Thornbury/After2.JPG", cardTheme: "plum" },
	{ id: "tutshill-1", title: "Tutshill Image 1", imageBefore: "/Tutshill/Before1.JPG", imageAfter: "/Tutshill/After1.JPG", cardTheme: "sage" },
	{ id: "tutshill-2", title: "Tutshill Image 2", imageBefore: "/Tutshill/Before2.JPG", imageAfter: "/Tutshill/AFter2.JPG", cardTheme: "plum" },
	{ id: "usk-1", title: "Usk Image 1", imageBefore: "/Usk/Before1.JPG", imageAfter: "/Usk/After1.JPG", cardTheme: "sage" },
	{ id: "usk-3", title: "Usk Image 3", imageBefore: "/Usk/Before3.JPG", imageAfter: "/Usk/After3.JPG", cardTheme: "plum" },
];
