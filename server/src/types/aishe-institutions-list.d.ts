declare module "aishe-institutions-list" {
  interface Institution {
    aisheCode: string;
    name: string;
    state: string;
    district: string;
  }

  /**
   * Search institutions by query string.
   * @param query Search term (e.g., AISHE code or name)
   * @param limit Max results to return (optional)
   * @returns Array of Institution objects
   */
  export function search(query: string, limit?: number): Institution[];

  // If default export is used, export here accordingly
  // export default { search };
}
