import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

const jobExample = `import { BackgroundService } from "@rapidrest/service-core";

export class Job extends BackgroundService {
    public get schedule(): string | undefined {
        return "* * * *"; // Run every minute
    }

    public async run(): Promise<void> {
        // TODO
    }

    public async start(): Promise<void> {
        // TODO
    }

    public async stop(): Promise<void> {
        // TODO
    }
}
`;

const modelExample = `import {
  DatabaseDecorators, BaseMongoEntity
} from '@rapidrest/service-core';
const { Column, DataStore, Entity } = DatabaseDecorators;

@DataStore('mongo')
@Entity()
export class Pet extends BaseMongoEntity {
  @Column()
  public name: string = "";

  @Column()
  public species: string = "";

  constructor(other?: any) {
        super(other);
        
        if (other) {
            this.name = "name" in other ? other.name.trim() : this.name;
            this.species = "species" in other ? other.species : this.species;
        }
    }
}
`;

const routeExample = `import {
  CRUDRoute, RouteDecorators
} from '@rapidrest/service-core';
import { Pet } from "../models/Pet.js";
const { Model, Route } = RouteDecorators;

@Model(Pet)
@Route('/pets')
export class PetRoute extends CRUDRoute<Pet> {}
`;

const ssrExample = `// src/service/PetService.ts
import { ReactService } from "@rapidrest/react";

@ReactService("/app/pets")
export class PetService {
  @Inject(RepoUtils, { name: Pet.name, args: [Pet] })
  private petUtils?: RepoUtils<Pet>;

  public async function fetchProps() {
    return { pets: await this.petUtils?.find() };
  }
}

// apps/www/pets.tsx
import "../src/models/Pet.js";

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
          <Heading as="h2">A complete REST API in under 50 lines</Heading>
          <p>
            No hand-written handlers, no manual route registration, no boilerplate database code. Just add a data model
            and a route class, then let RapidREST do the rest!
          </p>
          <p>
            RapidREST even generates a complete OpenAPI spec.
          </p>
        </div>
        <div className={styles.codeWrap}>
          <Tabs groupId="showcase" queryString="showcase">
            <TabItem value="model" label="DATA MODEL">
              <CodeBlock language="ts" title="src/models/Pet.ts">
                {modelExample}
              </CodeBlock>
            </TabItem>
            <TabItem value="route" label="REST API">
              <CodeBlock language="ts" title="src/routes/PetRoute.ts">
                {routeExample}
              </CodeBlock>
            </TabItem>
            <TabItem value="job" label="JOB">
              <CodeBlock language="ts" title="src/jobs/Job.ts">
                {jobExample}
              </CodeBlock>
            </TabItem>
            <TabItem value="ssr" label="REACT PAGE">
              <CodeBlock language="tsx" title="src/services/PetService.ts + apps/www/pets.tsx">
                {ssrExample}
              </CodeBlock>
            </TabItem>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
