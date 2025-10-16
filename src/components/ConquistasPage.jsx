import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Trophy, Star, Target, TrendingUp, Award, Zap, Crown } from 'lucide-react'
import { getCurrentUser, getUserAchievements, getUserRanking, ACHIEVEMENTS } from '../services/authService.js'

export function ConquistasPage() {
  const [user, setUser] = useState(null)
  const [userAchievements, setUserAchievements] = useState([])
  const [ranking, setRanking] = useState([])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setUserAchievements(getUserAchievements())
      setRanking(getUserRanking())
    }
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Faça login para ver suas conquistas</p>
      </div>
    )
  }

  const unlockedIds = userAchievements.map(a => a.id)
  const locked = ACHIEVEMENTS.filter(a => !unlockedIds.includes(a.id))
  const progressPercentage = (userAchievements.length / ACHIEVEMENTS.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header com Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Nível */}
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="inline-block mb-2"
                  >
                    <Crown className="h-12 w-12" />
                  </motion.div>
                  <div className="text-4xl font-bold">Nível {user.nivel}</div>
                  <div className="text-sm opacity-90">Seu Nível</div>
                </div>

                {/* Pontos */}
                <div className="text-center">
                  <Zap className="h-12 w-12 mx-auto mb-2" />
                  <div className="text-4xl font-bold">{user.pontos}</div>
                  <div className="text-sm opacity-90">Pontos Totais</div>
                </div>

                {/* Streak */}
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Star className="h-12 w-12 mx-auto mb-2 fill-current" />
                  </motion.div>
                  <div className="text-4xl font-bold">{user.streak.current}</div>
                  <div className="text-sm opacity-90">Dias Seguidos</div>
                </div>

                {/* Conquistas */}
                <div className="text-center">
                  <Trophy className="h-12 w-12 mx-auto mb-2" />
                  <div className="text-4xl font-bold">{userAchievements.length}/{ACHIEVEMENTS.length}</div>
                  <div className="text-sm opacity-90">Conquistas</div>
                </div>
              </div>

              {/* Barra de Progresso */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progresso Geral</span>
                  <span>{progressPercentage.toFixed(0)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3 bg-white/30" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="conquistas" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="conquistas">
              <Trophy className="h-4 w-4 mr-2" />
              Conquistas
            </TabsTrigger>
            <TabsTrigger value="ranking">
              <TrendingUp className="h-4 w-4 mr-2" />
              Ranking
            </TabsTrigger>
          </TabsList>

          {/* Aba de Conquistas */}
          <TabsContent value="conquistas" className="mt-6 space-y-6">
            {/* Conquistas Desbloqueadas */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Conquistas Desbloqueadas ({userAchievements.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3, delay: index * 0.2 }}
                            className="text-5xl"
                          >
                            {achievement.icon}
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {achievement.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-yellow-500 text-white">
                                +{achievement.points} pontos
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Conquistas Bloqueadas */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Target className="h-6 w-6 text-muted-foreground" />
                Próximas Conquistas ({locked.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {locked.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="opacity-60 hover:opacity-80 transition-opacity">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="text-5xl grayscale">
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {achievement.description}
                            </p>
                            <Badge variant="outline">
                              +{achievement.points} pontos
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Aba de Ranking */}
          <TabsContent value="ranking" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Top 10 Usuários
                </CardTitle>
                <CardDescription>
                  Os membros mais dedicados do Portal Adventista
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ranking.map((rankUser, index) => {
                    const isCurrentUser = rankUser.id === user.id
                    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : null

                    return (
                      <motion.div
                        key={rankUser.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          isCurrentUser ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold w-8 text-center">
                            {medal || `#${index + 1}`}
                          </div>
                          <div>
                            <div className="font-semibold flex items-center gap-2">
                              {rankUser.nome}
                              {isCurrentUser && (
                                <Badge variant="secondary" className="text-xs">Você</Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Nível {rankUser.nivel} • {rankUser.streak} dias seguidos
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {rankUser.pontos}
                          </div>
                          <div className="text-xs text-muted-foreground">pontos</div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {!ranking.find(r => r.id === user.id) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-muted rounded-lg"
                  >
                    <div className="text-center text-sm text-muted-foreground">
                      Continue estudando para entrar no Top 10! 💪
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dicas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Como Ganhar Pontos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Badge>+10</Badge>
                  <span>Ler um capítulo da Bíblia</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>+5</Badge>
                  <span>Ler um devocional</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>+20</Badge>
                  <span>Completar uma lição de estudo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>+3</Badge>
                  <span>Criar uma anotação</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>+2</Badge>
                  <span>Salvar um marcador</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>Variável</Badge>
                  <span>Desbloquear conquistas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

