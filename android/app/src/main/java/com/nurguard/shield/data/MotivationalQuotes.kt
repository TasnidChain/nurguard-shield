package com.nurguard.shield.data

object MotivationalQuotes {
    
    val quotes = listOf(
        "The strong person is not the one who can overpower others, but the one who controls himself when angry. - Prophet Muhammad ﷺ",
        "Verily, with hardship comes ease. - Quran 94:6",
        "Do not be sad, indeed Allah is with us. - Quran 9:40",
        "Allah does not burden a soul beyond that it can bear. - Quran 2:286",
        "The best of you are those who are best to their families. - Prophet Muhammad ﷺ",
        "Whoever is patient, Allah will make him patient. Nobody is given a better or vaster gift than patience. - Prophet Muhammad ﷺ",
        "The believer does not slander, curse, or speak in an obscene or foul manner. - Prophet Muhammad ﷺ",
        "When you see a person who has been given more than you in money and beauty, look to those who have been given less. - Prophet Muhammad ﷺ",
        "The most beloved deed to Allah is the most regular and constant even if it were little. - Prophet Muhammad ﷺ",
        "He who is not grateful to people is not grateful to Allah. - Prophet Muhammad ﷺ",
        "Speak good or remain silent. - Prophet Muhammad ﷺ",
        "The world is a prison for the believer and a paradise for the disbeliever. - Prophet Muhammad ﷺ",
        "Richness is not having many possessions, but richness is being content with oneself. - Prophet Muhammad ﷺ",
        "A good word is charity. - Prophet Muhammad ﷺ",
        "The best richness is the richness of the soul. - Prophet Muhammad ﷺ",
        "Your body has a right over you. - Prophet Muhammad ﷺ",
        "Modesty brings nothing but good. - Prophet Muhammad ﷺ",
        "He who believes in Allah and the Last Day should speak good or keep silent. - Prophet Muhammad ﷺ",
        "The most perfect believer in faith is the one whose character is finest. - Prophet Muhammad ﷺ",
        "Do not waste water even if you were at a running stream. - Prophet Muhammad ﷺ",
        "Seek knowledge from the cradle to the grave. - Prophet Muhammad ﷺ",
        "The ink of the scholar is more sacred than the blood of the martyr. - Prophet Muhammad ﷺ",
        "Whoever treads a path seeking knowledge, Allah will make easy for him the path to Paradise. - Prophet Muhammad ﷺ",
        "Make things easy and do not make them difficult. - Prophet Muhammad ﷺ",
        "None of you truly believes until he loves for his brother what he loves for himself. - Prophet Muhammad ﷺ",
        "The merciful will be shown mercy by the Most Merciful. - Prophet Muhammad ﷺ",
        "Kindness is a mark of faith, and whoever is not kind has no faith. - Prophet Muhammad ﷺ",
        "A man's true wealth is the good he does in this world. - Prophet Muhammad ﷺ",
        "The best among you is the one who doesn't harm others with his tongue and hands. - Prophet Muhammad ﷺ",
        "Be in this world as if you were a stranger or a traveler. - Prophet Muhammad ﷺ",
    )
    
    fun getRandomQuote(): String {
        return quotes.random()
    }
    
    fun getQuoteForCooldown(cooldownSeconds: Int): String {
        // Return longer quotes for longer cooldowns
        return when {
            cooldownSeconds >= 30 -> quotes.filter { it.length > 100 }.randomOrNull() ?: getRandomQuote()
            cooldownSeconds >= 15 -> quotes.filter { it.length in 60..120 }.randomOrNull() ?: getRandomQuote()
            else -> quotes.filter { it.length < 100 }.randomOrNull() ?: getRandomQuote()
        }
    }
}
