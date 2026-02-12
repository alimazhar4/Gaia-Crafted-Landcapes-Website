// Project types
export type ProjectType =
	| "full-landscaping"
	| "planters-pergolas"
	| "garden-design"
	| "patio-paving"
	| "fencing"
	| "driveway"
	| "garden-room";

// Journey stage types
export type JourneyStage = "planning" | "only-quote" | "multiple-quotes" | "ready";

// Form data interface (for form state - can have null values)
export interface FormData {
	projectType: ProjectType | null;
	journeyStage: JourneyStage | null;
	name: string;
	phone: string;
	email: string;
	postcode: string;
}

// Submitted form data interface (for API - no null values)
export interface SubmittedFormData {
	projectType: ProjectType;
	journeyStage: JourneyStage;
	name: string;
	phone: string;
	email: string;
	postcode: string;
}
