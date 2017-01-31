module ApplicationHelper
  def svg(name, klass = '')
    file_path = "#{Rails.root}/app/assets/images/#{name}.svg"

    return '(not found)' unless File.exists?(file_path)
    content_tag(:i, File.read(file_path).html_safe, class: "svg-icon #{klass}")
  end
end
