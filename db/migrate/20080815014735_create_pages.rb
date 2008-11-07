class CreatePages < ActiveRecord::Migration
  def self.up    
    create_versioned_table :pages do |t|
      t.integer :template_id
      t.string :name
      t.string :title
      t.string :path
      t.text :description
      t.text :keywords
      t.string :language
      t.boolean :cacheable, :default => false
      t.boolean :hidden, :default => false
    end
    
  end

  def self.down
    drop_versioned_table :pages
  end
  
end
