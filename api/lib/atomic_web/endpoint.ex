defmodule AtomicWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :atomic
  use Absinthe.Phoenix.Endpoint

  socket "/socket", AtomicWeb.UserSocket,
    websocket: [ timeout: 45_000, check_origin: ["http://localhost:3000", "https://atomic-time.gigalixirapp.com","https://atomic-time.netlify.com"]],
    longpoll: false

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phx.digest
  # when deploying your static files in production.
  plug Plug.Static,
    at: "/",
    from: :atomic,
    gzip: false,
    only: ~w(css fonts images js favicon.ico robots.txt)

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Telemetry, event_prefix: [:phoenix, :endpoint]

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()

  plug Plug.MethodOverride
  plug Plug.Head

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug Plug.Session,
    store: :cookie,
    key: "_atomic_key",
    signing_salt: "8YcfoavZ"

  plug CORSPlug

  plug AtomicWeb.Router
end
