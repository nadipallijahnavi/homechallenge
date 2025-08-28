import { Book } from '../types/Book';

interface OpenLibraryBook {
  key: string;
  title: string;
  subtitle?: string;
  author_name?: string[];
  first_publish_year?: number;
  publisher?: string[];
  isbn?: string[];
  subject?: string[];
  language?: string[];
  number_of_pages_median?: number;
  cover_i?: number;
}

interface OpenLibraryResponse {
  docs: OpenLibraryBook[];
  num_found: number;
}

export async function searchBooks(query: string, searchType: string, limit: number = 20): Promise<Book[]> {
  const encodedQuery = encodeURIComponent(query);
  let searchParam: string;

  // Map search types to Open Library API parameters
  switch (searchType) {
    case 'author':
      searchParam = `author=${encodedQuery}`;
      break;
    case 'subject':
      searchParam = `subject=${encodedQuery}`;
      break;
    case 'isbn':
      searchParam = `isbn=${encodedQuery}`;
      break;
    case 'title':
    default:
      searchParam = `title=${encodedQuery}`;
      break;
  }

  const url = `https://openlibrary.org/search.json?${searchParam}&limit=${limit}&fields=key,title,subtitle,author_name,first_publish_year,publisher,isbn,subject,language,number_of_pages_median,cover_i`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: OpenLibraryResponse = await response.json();
    
    return data.docs.map(transformBook).filter(book => book.title);
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
}

function transformBook(apiBook: OpenLibraryBook): Book {
  // Generate cover URL if cover ID exists
  const coverUrl = apiBook.cover_i 
    ? `https://covers.openlibrary.org/b/id/${apiBook.cover_i}-M.jpg`
    : undefined;

  // Join authors if multiple
  const author = apiBook.author_name ? apiBook.author_name.join(', ') : undefined;

  // Get the first publisher if multiple
  const publisher = apiBook.publisher ? apiBook.publisher[0] : undefined;

  // Clean and limit subjects
  const subjects = apiBook.subject 
    ? apiBook.subject
        .filter(subject => subject.length < 50) // Remove very long subjects
        .slice(0, 8) // Limit to 8 subjects
    : undefined;

  return {
    key: apiBook.key,
    title: apiBook.title,
    subtitle: apiBook.subtitle,
    author,
    authors: apiBook.author_name,
    publishYear: apiBook.first_publish_year,
    publisher,
    isbn: apiBook.isbn,
    subjects,
    languages: apiBook.language,
    pages: apiBook.number_of_pages_median,
    coverUrl,
  };
}