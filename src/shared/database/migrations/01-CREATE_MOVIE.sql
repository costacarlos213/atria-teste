CREATE TABLE IF NOT EXISTS movies (
      id uuid PRIMARY KEY,
      title varchar(255) NOT NULL,
      year integer NOT NULL,
      runtime integer NOT NULL,
      genres varchar(255)[] NOT NULL,
      director varchar(255) NOT NULL,
      active boolean NOT NULL DEFAULT true,
      created_at timestamp NOT NULL DEFAULT NOW(),
      updated_at timestamp NOT NULL DEFAULT NOW()
    );
