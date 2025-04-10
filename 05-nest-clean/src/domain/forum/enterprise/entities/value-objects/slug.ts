export class Slug {
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(slug: string): Slug {
    return new Slug(slug);
  }

  /**
   * Receives a string and normalize it as a slug.
   *
   * Example: "An example title" -> "an-example-title"
   *
   * @param text {string} The text to be normalized
   *
   * @returns {Slug} The slug object
   */
  static createFromText(text: string): Slug {
    const slugText = text
      .normalize('NFKD')
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '');

    return new Slug(slugText);
  }
}
