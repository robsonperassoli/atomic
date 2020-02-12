defmodule AtomicWeb.EventConsumer do
  use ConsumerSupervisor
  alias AtomicWeb.{EventBus, ReportWorker}

  def start_link(arg) do
    ConsumerSupervisor.start_link(__MODULE__, arg)
  end

  def init(_arg) do
    children = [%{id: 1, start: {ReportWorker, :start_link, []}, restart: :transient}]
    opts = [strategy: :one_for_one, subscribe_to: [EventBus]]
    ConsumerSupervisor.init(children, opts)
  end
end
