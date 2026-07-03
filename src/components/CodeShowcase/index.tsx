import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

const crudExample = `import {
  ModelRoute, Model, Route,
  Entity, Column, DataStore, BaseMongoEntity,
} from '@rapidrest/service-core';

@DataStore('mongo')
@Entity()
export class Pet extends BaseMongoEntity {
  @Column() name!: string;
  @Column() species!: string;
}

@Model(Pet)
@Route('/pets')
export class PetRoute extends ModelRoute<Pet> {}
`;

const ssrExample = `// app/pets.tsx
import {getPets} from '../services/PetService';

export async function fetchProps() {
  return {pets: await getPets()};
}

export default function PetsPage({pets}: {pets: Pet[]}) {
  return (
    <ul>
      {pets.map((pet) => (
        <li key={pet.id}>{pet.name}</li>
      ))}
    </ul>
  );
}
`;

export default function CodeShowcase(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <Heading as="h2">A full CRUD API in one file</Heading>
          <p>
            No hand-written handlers, no manual route registration. Add a model,
            add a route class, and RapidREST does the rest — including the OpenAPI spec.
          </p>
        </div>
        <div className={styles.codeWrap}>
          <Tabs groupId="showcase" queryString="showcase">
            <TabItem value="crud" label="REST API">
              <CodeBlock language="tsx" title="src/models/Pet.ts + src/routes/PetRoute.ts">
                {crudExample}
              </CodeBlock>
            </TabItem>
            <TabItem value="ssr" label="SSR React page">
              <CodeBlock language="tsx" title="app/pets.tsx">
                {ssrExample}
              </CodeBlock>
            </TabItem>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
