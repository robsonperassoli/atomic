# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :atomic,
  ecto_repos: [Atomic.Repo]

# Configures the endpoint
config :atomic, AtomicWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "9byv/thpiOcL88j0X110d7s49zPZKBKK+NkJ58IwQGGGXfCOhKCIazqJaeKAMdCt",
  render_errors: [view: AtomicWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: Atomic.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :atomic, Atomic.Guardian,
  # optional
  allowed_algos: ["HS512"],
  # optional
  verify_module: Guardian.JWT,
  issuer: "Atomic",
  ttl: {30, :days},
  allowed_drift: 2000,
  # optional
  verify_issuer: true,
  # generated using: JOSE.JWK.generate_key({:oct, 16}) |> JOSE.JWK.to_map |> elem(1)
  secret_key: %{"k" => "3gx0vXjUD2BJ8xfo_aQWIA", "kty" => "oct"},
  serializer: Atomic.Guardian

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
