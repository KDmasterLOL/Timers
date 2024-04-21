let id = 0
export function generate_id(): number { return id++ }

export interface UUID {
  id: number
}
