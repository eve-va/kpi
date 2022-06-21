import { Prisma } from '@prisma/client';

export const ItemData: Prisma.ItemCreateInput[] = [
  {
    title: 'The Lord of the Rings',
    author: 'J. R. R. Tolkien',
    genre: 'FANTASY',
    description: "The Lord of the Rings is an epic high-fantasy novel by English author and scholar J. R. R. Tolkien. Set in Middle-earth, intended to be Earth at some distant time in the past, the story began as a sequel to Tolkien's 1937 children's book The Hobbit, but eventually developed into a much larger work.",
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'SCIFI',
    description: "Dune is a 1965 epic science fiction novel by American author Frank Herbert, originally published as three separate serials in Analog magazine. It tied with Roger Zelazny's This Immortal for the Hugo Award in 1966 and it won the inaugural Nebula Award for Best Novel.",
  },
  {
    title: 'The Adventures of Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    genre: 'MYSTERY',
    description: 'The Adventures of Sherlock Holmes is a collection of twelve short stories by Arthur Conan Doyle, first published on 14 October 1892.',
  },
  {
    title: 'The Three Musketeers',
    author: 'Alexandre Dumas',
    genre: 'ADVENTURE',
    description: 'The Three Musketeers is a French historical adventure novel written in 1844 by French author Alexandre Dumas. It is in the swashbuckler genre, which has heroic, chivalrous swordsmen who fight for justice.',
  },
  {
    title: 'IT',
    author: 'Stephen King',
    genre: 'HORROR',
    description: "A 1986 horror novel by American author Stephen King. The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise itself while hunting its prey.",
  },
];