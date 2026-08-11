import React, { useState, useMemo } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Note, ModuleId } from '../types';
import { Search, Plus, Trash2, Edit2, Star, X, Tag } from 'lucide-react';
import { modules } from '../data/courses';

export default function Notes() {
  const { progress, dispatch } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModule, setFilterModule] = useState<ModuleId | 'all'>('all');
  const [filterFavorites, setFilterFavorites] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    moduleId: '' as ModuleId | '',
    tags: '',
    isFavorite: false
  });

  const filteredNotes = useMemo(() => {
    return progress.notes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesModule = filterModule === 'all' || note.moduleId === filterModule;
      const matchesFavorite = filterFavorites ? note.isFavorite : true;
      return matchesSearch && matchesModule && matchesFavorite;
    }).sort((a, b) => b.updatedAt - a.updatedAt);
  }, [progress.notes, searchQuery, filterModule, filterFavorites]);

  const handleOpenModal = (note?: Note) => {
    if (note) {
      setEditingNote(note);
      setFormData({
        title: note.title,
        content: note.content,
        moduleId: note.moduleId || '',
        tags: note.tags.join(', '),
        isFavorite: note.isFavorite
      });
    } else {
      setEditingNote(null);
      setFormData({
        title: '',
        content: '',
        moduleId: '',
        tags: '',
        isFavorite: false
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
    
    if (editingNote) {
      const updatedNote: Note = {
        ...editingNote,
        title: formData.title,
        content: formData.content,
        moduleId: formData.moduleId ? formData.moduleId as ModuleId : undefined,
        tags: tagsArray,
        isFavorite: formData.isFavorite,
        updatedAt: Date.now()
      };
      dispatch({ type: 'UPDATE_NOTE', note: updatedNote });
    } else {
      const newNote: Note = {
        id: `note-${Date.now()}`,
        title: formData.title,
        content: formData.content,
        moduleId: formData.moduleId ? formData.moduleId as ModuleId : undefined,
        tags: tagsArray,
        isFavorite: formData.isFavorite,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      dispatch({ type: 'ADD_NOTE', note: newNote });
      dispatch({ type: 'ADD_XP', amount: 10 });
    }
    handleCloseModal();
  };

  const handleDelete = (noteId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta anotação?')) {
      dispatch({ type: 'DELETE_NOTE', noteId });
    }
  };

  const toggleFavorite = (note: Note) => {
    dispatch({ 
      type: 'UPDATE_NOTE', 
      note: { ...note, isFavorite: !note.isFavorite, updatedAt: Date.now() } 
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">Minhas Anotações</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1">
            Gerencie seus resumos e ideias durante os estudos
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors font-medium"
        >
          <Plus size={20} />
          Nova Anotação
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl border border-stone-200 dark:border-neutral-700 mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
          <input
            type="text"
            placeholder="Buscar anotações..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 dark:border-neutral-700 bg-stone-50 dark:bg-neutral-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        
        <select
          value={filterModule}
          onChange={(e) => setFilterModule(e.target.value as ModuleId | 'all')}
          className="px-4 py-2 rounded-lg border border-stone-200 dark:border-neutral-700 bg-stone-50 dark:bg-neutral-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 min-w-[200px]"
        >
          <option value="all">Todos os Módulos</option>
          {modules?.map(m => (
            <option key={m.id} value={m.id}>{m.title}</option>
          ))}
        </select>

        <button
          onClick={() => setFilterFavorites(!filterFavorites)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            filterFavorites 
              ? 'bg-amber-100 border-amber-300 text-amber-700 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-400' 
              : 'border-stone-200 dark:border-neutral-700 bg-stone-50 dark:bg-neutral-900 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-neutral-800'
          }`}
        >
          <Star size={20} className={filterFavorites ? 'fill-current' : ''} />
          Favoritos
        </button>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl border border-stone-200 dark:border-neutral-700">
          <div className="w-16 h-16 bg-stone-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
            <Edit2 size={32} />
          </div>
          <h3 className="text-xl font-medium text-stone-900 dark:text-stone-100 mb-2">
            Nenhuma anotação encontrada
          </h3>
          <p className="text-stone-500 dark:text-stone-400 mb-6">
            {progress.notes.length === 0 
              ? 'Você ainda não criou nenhuma anotação. Comece a documentar seu aprendizado!' 
              : 'Tente ajustar seus filtros para encontrar o que procura.'}
          </p>
          {progress.notes.length === 0 && (
            <button
              onClick={() => handleOpenModal()}
              className="px-6 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors font-medium"
            >
              Criar Primeira Anotação
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map(note => (
            <div key={note.id} className="bg-white dark:bg-neutral-800 rounded-xl border border-stone-200 dark:border-neutral-700 overflow-hidden flex flex-col hover:border-amber-500/50 transition-colors group">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 line-clamp-2">
                    {note.title}
                  </h3>
                  <button 
                    onClick={() => toggleFavorite(note)}
                    className="text-stone-400 hover:text-amber-500 transition-colors ml-2 flex-shrink-0"
                  >
                    <Star size={20} className={note.isFavorite ? 'fill-amber-500 text-amber-500' : ''} />
                  </button>
                </div>
                
                {note.moduleId && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium mb-3">
                    {modules?.find(m => m.id === note.moduleId)?.title || note.moduleId}
                  </div>
                )}
                
                <p className="text-stone-600 dark:text-stone-300 text-sm line-clamp-4 mb-4 whitespace-pre-wrap">
                  {note.content}
                </p>
                
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {note.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-neutral-700 px-2 py-1 rounded-md">
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="px-5 py-3 border-t border-stone-100 dark:border-neutral-700/50 bg-stone-50 dark:bg-neutral-800/50 flex justify-between items-center">
                <span className="text-xs text-stone-400 dark:text-stone-500">
                  {new Date(note.updatedAt).toLocaleDateString('pt-BR')}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleOpenModal(note)}
                    className="p-1.5 text-stone-500 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-500 rounded-md hover:bg-amber-50 dark:hover:bg-amber-900/20"
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(note.id)}
                    className="p-1.5 text-stone-500 hover:text-red-600 dark:text-stone-400 dark:hover:text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl border border-stone-200 dark:border-neutral-700">
            <div className="flex justify-between items-center p-6 border-b border-stone-200 dark:border-neutral-700 sticky top-0 bg-white/95 dark:bg-neutral-800/95 backdrop-blur z-10">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                {editingNote ? 'Editar Anotação' : 'Nova Anotação'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Ex: Padrões de System Prompts"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Módulo Relacionado (Opcional)
                  </label>
                  <select
                    value={formData.moduleId}
                    onChange={(e) => setFormData({...formData, moduleId: e.target.value as ModuleId | ''})}
                    className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Nenhum módulo específico</option>
                    {modules?.map(m => (
                      <option key={m.id} value={m.id}>{m.title}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Tags (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Ex: prompt, dicas, claude"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Conteúdo
                </label>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm resize-y"
                  placeholder="Escreva suas anotações aqui..."
                />
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isFavorite"
                  checked={formData.isFavorite}
                  onChange={(e) => setFormData({...formData, isFavorite: e.target.checked})}
                  className="w-4 h-4 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="isFavorite" className="text-sm text-stone-700 dark:text-stone-300 flex items-center gap-1 cursor-pointer">
                  Marcar como favorito <Star size={14} className={formData.isFavorite ? "fill-amber-500 text-amber-500" : "text-stone-400"} />
                </label>
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t border-stone-200 dark:border-neutral-700">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-lg border border-stone-300 dark:border-neutral-600 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-neutral-700 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors font-medium flex items-center gap-2"
                >
                  {editingNote ? 'Salvar Alterações' : 'Criar Anotação'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
