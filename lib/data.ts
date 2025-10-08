// lib/data.ts
import type { RoadmapSchema } from "@/types/roadmap";
import data from "@/utils/data.json"

export default data;

export const  roadmapData: RoadmapSchema[] = data["module"]


export function getRoadmapById(id: number): RoadmapSchema | undefined {
  return roadmapData[id];
}

export function getAllRoadmaps(): RoadmapSchema[] {
  return roadmapData;
}

export function getRoadmapsByLevel(level: string): RoadmapSchema[] {
  return roadmapData.filter(roadmap => roadmap.level === level);
}