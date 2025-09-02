'use client'
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Menu, 
  Plus, 
  Send, 
  MessageCircle, 
  Sparkles, 
  User, 
  Settings,
  Star,
  Heart,
  Zap
} from 'lucide-react';

// Define TypeScript interfaces
interface Character {
  id: number;
  name: string;
  avatar: string;
  description: string;
  personality: string;
  status: 'online' | 'away' | 'offline';
}

interface Message {
  id: number;
  sender: 'user' | 'character';
  text: string;
  timestamp: Date;
}

const AnimeTalkDashboard = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: 1,
      name: "Sakura Haruno",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      description: "Ninja medis yang ceria dan penuh semangat dari Konoha",
      personality: "Ceria, peduli, dan selalu siap membantu",
      status: "online"
    },
    // {
    //   id: 2,
    //   name: "Rem",
    //   avatar: "https://images.unsplash.com/photo-1494790108755-2616c95a1cd3?w=150&h=150&fit=crop&crop=face",
    //   description: "Maid setia dengan rambut biru yang selalu mengutamakan tuannya",
    //   personality: "Setia, pemalu, namun sangat kuat saat diperlukan",
    //   status: "online"
    // },
    // {
    //   id: 3,
    //   name: "Zero Two",
    //   avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    //   description: "Pilot Franxx dengan kepribadian liar dan misterius",
    //   personality: "Bebas, misterius, dan penuh energi",
    //   status: "away"
    // }
  ]);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAddCharacterOpen, setIsAddCharacterOpen] = useState(false);
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    avatar: '',
    description: '',
    personality: ''
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    if (characters.length > 0) {
      setSelectedCharacter(characters[0]);
      const message: Message = {
        id: 1,
        sender: 'character',
        text: `Halo! Aku ${characters[0].name}. Senang bisa ngobrol denganmu! Ada yang ingin kamu bicarakan?`,
        timestamp: new Date()
      };
      setMessages([message]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedCharacter) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: 'user' as const,
      text: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate character response
    setTimeout(() => {
      const responses = [
        "Wah, itu menarik sekali! Ceritakan lebih banyak dong~",
        "Hehe, kamu lucu ya! Aku suka ngobrol sama kamu ✨",
        "Hmm... aku paham perasaanmu. Kadang hidup memang sulit ya...",
        "Kyaa! Itu keren banget! Aku jadi excited nih!",
        "Arigatou gozaimasu! Kamu selalu bisa bikin aku tersenyum 😊"
      ];
      
      const characterResponse: Message = {
        id: Date.now() + 1,
        sender: 'character' as const,
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, characterResponse]);
    }, 1000);
  };

  const handleAddCharacter = () => {
    if (!newCharacter.name.trim()) return;

    const character: Character = {
      id: Date.now(),
      name: newCharacter.name,
      avatar: newCharacter.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      description: newCharacter.description || "Karakter anime yang menarik",
      personality: newCharacter.personality || "Ramah dan menyenangkan",
      status: "online"
    };

    setCharacters(prev => [...prev, character]);
    setNewCharacter({ name: '', avatar: '', description: '', personality: '' });
    setIsAddCharacterOpen(false);
  };

  const selectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    const message: Message = {
      id: Date.now(),
      sender: 'character' as const,
      text: `Konnichiwa! Aku ${character.name}. ${character.description} Yuk ngobrol!`,
      timestamp: new Date()
    };
    setMessages([message]);
    setIsSidebarOpen(false);
  };

  const CharacterSidebar = () => (
    <div className="h-full bg-gradient-to-b from-slate-800/50 to-purple-800/50 backdrop-blur-lg p-6 flex flex-col">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Karakter Anime
          </h2>
          <Badge className="bg-purple-500/20 text-purple-300 text-xs">
            {characters.length}
          </Badge>
        </div>
        <p className="text-sm text-gray-400">Pilih karakter untuk memulai chat</p>
      </div>

      <ScrollArea className="flex-1 pr-2">
        <div className="space-y-4">
          {characters.map((character, index) => (
            <Card 
              key={character.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg bg-gradient-to-r p-[1px] rounded-xl ${
                selectedCharacter?.id === character.id 
                  ? 'from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25 animate-pulse' 
                  : 'from-gray-600/50 to-gray-700/50 hover:from-purple-600 hover:to-pink-600'
              }`}
              onClick={() => selectCharacter(character)}
              style={{ 
                animationDelay: `${index * 100}ms`,
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                    <Avatar className="w-14 h-14 border-2 border-purple-400/50 ring-2 ring-purple-500/20">
                      <AvatarImage src={character.avatar} alt={character.name} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                        {character.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-slate-800 ${
                      character.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
                    } animate-pulse`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white truncate text-lg">{character.name}</h3>
                    <p className="text-xs text-purple-300 truncate font-medium">{character.personality}</p>
                  </div>
                  
                  {selectedCharacter?.id === character.id && (
                    <div className="text-purple-400 animate-pulse">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                  {character.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-6 pt-4 border-t border-purple-500/20">
        <Dialog open={isAddCharacterOpen} onOpenChange={setIsAddCharacterOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 py-3">
              <Plus className="w-5 h-5 mr-2" />
              Tambah Karakter Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-purple-500/30 text-white">
            <DialogHeader>
              <DialogTitle className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Tambah Karakter Baru
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Buat karakter anime custom untuk ngobrol
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="name" className="text-purple-300">Nama Karakter</Label>
                <Input
                  id="name"
                  value={newCharacter.name}
                  onChange={(e) => setNewCharacter({...newCharacter, name: e.target.value})}
                  placeholder="Contoh: Hinata Hyuga"
                  className="bg-slate-800 border-purple-500/30 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="avatar" className="text-purple-300">Avatar URL</Label>
                <Input
                  id="avatar"
                  value={newCharacter.avatar}
                  onChange={(e) => setNewCharacter({...newCharacter, avatar: e.target.value})}
                  placeholder="https://example.com/avatar.jpg"
                  className="bg-slate-800 border-purple-500/30 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-purple-300">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={newCharacter.description}
                  onChange={(e) => setNewCharacter({...newCharacter, description: e.target.value})}
                  placeholder="Ceritakan tentang karakter ini..."
                  className="bg-slate-800 border-purple-500/30 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="personality" className="text-purple-300">Kepribadian</Label>
                <Input
                  id="personality"
                  value={newCharacter.personality}
                  onChange={(e) => setNewCharacter({...newCharacter, personality: e.target.value})}
                  placeholder="Contoh: Pemalu, baik hati, pemberani"
                  className="bg-slate-800 border-purple-500/30 text-white"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                onClick={handleAddCharacter}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Buat Karakter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-pulse ${
              i % 3 === 0 ? 'text-purple-300/20' : i % 3 === 1 ? 'text-blue-300/20' : 'text-pink-300/20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 12 + 8}px`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Header */}
      <header className={`relative z-10 border-b border-purple-500/20 backdrop-blur-lg bg-black/20 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile menu trigger */}
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-purple-300 hover:bg-purple-500/20">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0 bg-slate-900 border-purple-500/30">
                <CharacterSidebar />
              </SheetContent>
            </Sheet>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AnimeTalk AI
                </h1>
                {selectedCharacter && (
                  <p className="text-sm text-gray-400">
                    Chatting with {selectedCharacter.name}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Zap className="w-4 h-4 mr-1" />
              Pro User
            </Badge>
            
            <Avatar className="w-8 h-8 border-2 border-purple-400/50">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                U
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Desktop Sidebar - Always Visible */}
        <div className={`w-80 border-r border-purple-500/20 backdrop-blur-lg bg-black/20 transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} hidden md:flex flex-col`}>
          <CharacterSidebar />
        </div>

        {/* Main Chat Area */}
        <div className={`flex-1 flex flex-col transition-all duration-1000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          {selectedCharacter ? (
            <>
              {/* Chat Header */}
              <div className="border-b border-purple-500/20 backdrop-blur-lg bg-black/10 p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12 border-2 border-purple-400/50">
                      <AvatarImage src={selectedCharacter.avatar} alt={selectedCharacter.name} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {selectedCharacter.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                      selectedCharacter.status === 'online' ? 'bg-green-400' : selectedCharacter.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {selectedCharacter.name}
                    </h3>
                    <p className="text-sm text-gray-400">{selectedCharacter.description}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="text-red-400 hover:bg-red-500/20">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-yellow-400 hover:bg-yellow-500/20">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 max-w-4xl mx-auto">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} transition-all duration-500 ${
                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        <Card className={`${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                            : 'bg-slate-800/80 border-purple-500/30'
                        } backdrop-blur-lg`}>
                          <CardContent className="p-3">
                            <p className="text-white leading-relaxed">{message.text}</p>
                            <p className="text-xs text-gray-300 mt-2 opacity-70">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      {message.sender === 'character' && (
                        <Avatar className="w-8 h-8 mr-3 order-1 self-end">
                          <AvatarImage src={selectedCharacter.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                            {selectedCharacter.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t border-purple-500/20 backdrop-blur-lg bg-black/10 p-4">
                <div className="max-w-4xl mx-auto">
                  <div className="flex space-x-3">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={`Ketik pesan untuk ${selectedCharacter.name}...`}
                      className="flex-1 bg-slate-800/80 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Welcome Screen
            <div className="flex-1 flex items-center justify-center p-8">
              <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30 backdrop-blur-lg max-w-md">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Selamat Datang!
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Pilih karakter anime dari sidebar untuk memulai percakapan yang seru!
                  </p>
                  <Button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="md:hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Menu className="w-4 h-4 mr-2" />
                    Pilih Karakter
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeTalkDashboard;