const e=JSON.parse('{"key":"v-1219996e","path":"/posts/prototype-pattern.html","title":"ASP.NET中的设计模式——原型模式","lang":"zh-CN","frontmatter":{"title":"ASP.NET中的设计模式——原型模式","date":"2018-04-24T12:32:12.000Z","category":"技术文章","tag":["ASP.NET","C#","设计模式","原型模式","原型链","Hashtable"],"description":"最近在工作室课上在讲 .NET 程序开发应该掌握的各种设计模式，恰巧看到设计模式中的原型模式与 JavaScript 中的继承机制——原型链有异曲同工之妙，便深入研究了一下。 在实际项目中，原型模式很少单独出现，一般是和工厂方法模式一起出现，通过 clone 的方法创建一个对象，然后由工厂方法提供给调用者。 现将本人学习心得分享与此以方便大家更好地学习掌握原型模式。","head":[["meta",{"property":"og:url","content":"https://typeofNaN.github.io/vuepress-blog/posts/prototype-pattern.html"}],["meta",{"property":"og:site_name","content":"typeofNaN"}],["meta",{"property":"og:title","content":"ASP.NET中的设计模式——原型模式"}],["meta",{"property":"og:description","content":"最近在工作室课上在讲 .NET 程序开发应该掌握的各种设计模式，恰巧看到设计模式中的原型模式与 JavaScript 中的继承机制——原型链有异曲同工之妙，便深入研究了一下。 在实际项目中，原型模式很少单独出现，一般是和工厂方法模式一起出现，通过 clone 的方法创建一个对象，然后由工厂方法提供给调用者。 现将本人学习心得分享与此以方便大家更好地学习掌握原型模式。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://typeofNaN.github.io/vuepress-blog/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-07T07:07:07.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"ASP.NET中的设计模式——原型模式"}],["meta",{"property":"article:author","content":"typeofNaN"}],["meta",{"property":"article:tag","content":"ASP.NET"}],["meta",{"property":"article:tag","content":"C#"}],["meta",{"property":"article:tag","content":"设计模式"}],["meta",{"property":"article:tag","content":"原型模式"}],["meta",{"property":"article:tag","content":"原型链"}],["meta",{"property":"article:tag","content":"Hashtable"}],["meta",{"property":"article:published_time","content":"2018-04-24T12:32:12.000Z"}],["meta",{"property":"article:modified_time","content":"2023-11-07T07:07:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ASP.NET中的设计模式——原型模式\\",\\"image\\":[\\"https://typeofNaN.github.io/vuepress-blog/\\"],\\"datePublished\\":\\"2018-04-24T12:32:12.000Z\\",\\"dateModified\\":\\"2023-11-07T07:07:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"typeofNaN\\",\\"url\\":\\"https://typeofnan.cn\\"}]}"]]},"headers":[{"level":2,"title":"原型模式介绍","slug":"原型模式介绍","link":"#原型模式介绍","children":[]},{"level":2,"title":"原型模式的UML类图","slug":"原型模式的uml类图","link":"#原型模式的uml类图","children":[]},{"level":2,"title":"原型模式的简单实现","slug":"原型模式的简单实现","link":"#原型模式的简单实现","children":[]},{"level":2,"title":"简历的原型实现","slug":"简历的原型实现","link":"#简历的原型实现","children":[]},{"level":2,"title":"实现ICloneable接口","slug":"实现icloneable接口","link":"#实现icloneable接口","children":[]},{"level":2,"title":"浅拷贝（Shallow Copy）","slug":"浅拷贝-shallow-copy","link":"#浅拷贝-shallow-copy","children":[{"level":3,"title":"浅拷贝引用类型会出现的错误","slug":"浅拷贝引用类型会出现的错误","link":"#浅拷贝引用类型会出现的错误","children":[]}]},{"level":2,"title":"深拷贝（Deep Copy）","slug":"深拷贝-deep-copy","link":"#深拷贝-deep-copy","children":[{"level":3,"title":"实现深拷贝","slug":"实现深拷贝","link":"#实现深拷贝","children":[]}]},{"level":2,"title":"JavaScript 继承机制——原型链","slug":"javascript-继承机制——原型链","link":"#javascript-继承机制——原型链","children":[]},{"level":2,"title":"数据模型缓存","slug":"数据模型缓存","link":"#数据模型缓存","children":[]},{"level":2,"title":"优点","slug":"优点","link":"#优点","children":[]},{"level":2,"title":"缺点","slug":"缺点","link":"#缺点","children":[]},{"level":2,"title":"适用场景","slug":"适用场景","link":"#适用场景","children":[]}],"git":{"createdTime":1699340827000,"updatedTime":1699340827000,"contributors":[{"name":"typeofNaN","email":"dmdefine6@gmail.com","commits":1}]},"readingTime":{"minutes":12.04,"words":3611},"filePathRelative":"posts/prototype-pattern.md","localizedDate":"2018年4月24日","excerpt":"<p>最近在工作室课上在讲 .NET 程序开发应该掌握的各种设计模式，恰巧看到设计模式中的原型模式与 JavaScript 中的继承机制——原型链有异曲同工之妙，便深入研究了一下。</p>\\n<p>在实际项目中，原型模式很少单独出现，一般是和工厂方法模式一起出现，通过 clone 的方法创建一个对象，然后由工厂方法提供给调用者。</p>\\n<p>现将本人学习心得分享与此以方便大家更好地学习掌握原型模式。</p>\\n","autoDesc":true}');export{e as data};
