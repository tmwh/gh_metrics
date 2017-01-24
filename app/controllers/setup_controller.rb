class SetupController < ApplicationController
  def index
    @repositories = load_repositories
    @labels = LabelsCarrier.new(load_events)

  end

  def update_labels
    @labels = LabelsCarrier.new(load_events)

    render json: { html: load_labels_content }
  end

  private

  def load_labels_content
    if load_events.exists?
      render_to_string( partial: 'setup/labels' ,  collection: @labels.label_status, as: :label,
                        locals: { select_options: @labels.labels_name_list })
    else
      I18n.t('no_labels')
    end
  end
end
