<cheatsheet>
	<header layout="row" layout-align="space-between">
		<div layout="row" flex="60">
			<a class="logo" href="{rioturl}">
				<img src="{rioturl}img/logo/riot120x.png" alt="RiotJS">
			</a>
			<div layout="row" layout-align="center">
				<h1>Cheatsheet</h1> <small>{cheatsheet.version}</small>
			</div>
		</div>
		<div flex="40" class="written-by">
			<p>Written with <span style="color: white">&#9829;</span> by <a href="https://github.com/{cheatsheet.author}">@{cheatsheet.author}</a></p>
			<p><small>Part of <a href="http://happy-css.com">happy-css.com</a></small></p>
		</div>
	</header>

	<div>
		<main layout="column" layout-wrap>
			<section>
				<h2>HTML CONSTRUCTS</h2>

				<h3><a href="{rioturl}guide/#named_elements">Accessing Elements</a></h3>
				<article>
					<h4>HTML Elements</h4>
					<span>You can also use <code>id</code> if you are more comfortable with that</span>
					<pre class="code" name="code">
						<code>	
							&lt;input name="username"/&gt;
							&lt;script&gt;
								this.username.value = 'admin'
							&lt;/script&gt;
						</code>
					</pre>
					<h4>Riot Sub Tags</h4>
					<pre class="code" name="code">
						<code>	
							&lt;my-sub-tag name="subtag"&gt;&lt;/my-sub-tag&gt;
							&lt;script&gt;
								this.tags.subtag
							&lt;/script&gt;
						</code>
					</pre>
				</article>

				<h3><a href="{rioturl}guide/#loops">Foreach</a></h3>
				<article>
					<h4>Arrays</h4>
					<pre class="code" name="code">
						<code>	
							&lt;div each=\{item, index in items\}&gt;
								\{index\} - \{item\}
							&lt;/div&gt;
							&lt;script&gt;
								this.items = ['this', 'is', 'a' 'riot!']
							&lt;/script&gt;
						</code>
					</pre>
					<h4>Objects</h4>
					<pre class="code" name="code">
						<code>
							&lt;div each=\{key, value in items\}&gt;
								\{key\} - \{value\}
							&lt;/div&gt;
							&lt;script&gt;
								this.items = 
								\{
									file: 'riot.png',
									path: 'images/'
								\}
							&lt;/script&gt;
						</code>
					</pre>
				</article>
				<h3><a href="{rioturl}guide/#nested-html">Yield</a></h3>
				<pre class="code">
					<code>
						&lt;yield/&gt;
					</code>
				</pre>
				<h3><a href="{rioturl}guide/#conditionals">Conditions</a></h3>
				<article>
					<h4>Block Element</h4>
					<pre class="code"><code>
						&lt;div if=\{ condition \}&gt;&lt;/div&gt;
					</code></pre>
						
					<h4>Inline</h4>
					<pre class="code"><code>
						&lt;div class=\{ active : condition\}&gt;&lt;/div&gt;
					</code></pre>
					<h4>Ternary</h4>
					<small>This is a JS expression, you need quotes for strings</small>
					<pre class="code"><code>
						&lt;div class=\{ condition ? 'enabled' : 'disabled'\}&gt;&lt;/div&gt;
					</code></pre>
				</article>
			</section>

			<section>
				<h2>Tag Object</h2>
				<span>Retrievable within Tag Scope <small>(this)</small></span>
				<article>
					<h3>Methods</h3>
						<div>mixin()</div>
						<div>
							<h4>TRIGGER EVENTS</h4>
							<div>
								<div><a href="{rioturl}api/#tag-update">update()</a></div>
								<div><a href="{rioturl}api/#mount">mount()</a></div>
								<div><a href="{rioturl}api/#tag-unmount">unmount()</a></div>
							</div>
						</div>
						<div>
							<h4>TRIGGER METHODS</h4>
							<div>
								<div><a href="{rioturl}api/observable/#trigger">trigger()</a></div>
								<div><a href="{rioturl}api/observable/#on">on()</a></div>
								<div><a href="{rioturl}api/observable/#one">one()</a></div>
								<div><a href="{rioturl}api/observable/#off">off()</a></div>
							</div>
						</div>
						

					<h3>Properties</h3>
						<div>isMounted</div>
						<div>opts</div>
						<div>parent</div>
						<div>root - tag element</div>
						<div>tags - children riot tags: defined by their name attribute or their tagname</div>
				</article>
			</section>

			<section>
				<h2><a href="{rioturl}api/observable/">Triggers - Observable</a></h2>
				<span>The Riot event system</span>
				<article>
					<h3>Events</h3>
						<p>this.update() is same as this.trigger('update')</p>

						<div>update()</div>
						<div>updated()</div>
						<div>mount()</div>
						<div>unmount()</div>
						

					<h3>Trigger</h3>
						<div><a href="{rioturl}api/observable/#trigger">trigger('event') - trigger event</a></div>
						<div><a href="{rioturl}api/observable/#on">on('event', function()\{\}) - react on event trigger</a></div>
						<div><a href="{rioturl}api/observable/#one">one('event', function()\{\}) - only once</a></div>
						<div><a href="{rioturl}api/observable/#off">off() - don't listen to event anymore</a></div>
				</article>
			</section>

			<section>
				<h2>Riot Object</h2>
				<span></span>
				<article>
					<h3>Methods</h3>
						<div><a href="{rioturl}guide/compiler/">compile()</a></div>
						<div><a href="{rioturl}guide/#mixins">mixin()</a></div>
						<div>mount()</div>
						<div>mountTo()</div>
						<div>observable()</div>
						<div>route()</div>
						<div>tag()</div>
						<div>update()</div>
						

					<h3>Properties</h3>
						<div>parsers</div>
						<div>version</div>
				</article>
			</section>

			<section>
				<h2><a href="{rioturl}api/router/">Router</a></h2>
				<span>Listening to and changing the url hash <small>(#customer/edit/3)</small></span>
				<article>

					<div><a href="{rioturl}api/router/#route">riot.route.route(args, function)</a></div>

					<div><a href="{rioturl}api/router/#route-to">riot.route.route('customer/list')</a></div>

					<div><a href="{rioturl}api/router/#route-start">riot.route.start()</a></div>

					<div><a href="{rioturl}api/router/#route-stop">riot.route.stop()</a></div>

					<div><a href="{rioturl}api/router/#route-exec">riot.route.exec()</a></div>

					<div><a href="{rioturl}api/router/#route-parser">riot.route.parser()</a></div>

				</article>
			</section>

			<section>
				<h2><a href="{rioturl}guide/#mixins">Mixin</a></h2>
				<span>Reusable functions</span>
				<article>
					<h3>Defining Mixins</h3>
					<pre><code>
						var object = \{ init : function()\{\} \}
					</code></pre>
					<h3><a href="{rioturl}guide/#sharing-mixin">load mixin under namespace</a></h3>
					<pre><code>
						riot.mixin('name', object)
					</code></pre>
					<h3>Using mixin within tag</h3>
					<pre><code>
						this.mixin('name')
					</code></pre>		
				</article>
			</section>

		</main>
	</div>

	<div>
		<section class="globalEvents">
			<h2>Global Events</h2>
			<a href="http://devdocs.io/dom/globaleventhandlers">All GlobalEventHandlers</a>
			<p>Events are prevented by default! you can avoid that by returning true at the end of your event function (<code>return true</code>)</p>
			<div>
				<b>Usage:</b>
				<pre class="code"><code>
					&lt;div onclick=\{ method \}&gt;&lt;/div&gt;
				</code></pre> 
			</div>
				
			</a>
			<article layout="column" layout-wrap>
				<div each={section, sections in events}>
					<h3>{section}</h3>
					<div each={event in sections}>
						<a href="https://developer.mozilla.org/en-US/docs/Web/Events/{event.replace(/^on/, '')}">{event}</a>
					</div>
				</div>
			</article>
		</section>
	</div>

	<footer>
		<p class="disclaimer">This is a privately maintained inofficial cheatsheet, but you are welcome to <a href="https://github.com/MartinMuzatko/riot-cheatsheet/tree/gh-pages">contribute</a>!</p>
	</footer>

	<script>

	this.cheatsheet =
	{
		version : 'First Draft',
		author  : 'MartinMuzatko',
		authorLink : ''
	}

	// Don't forget the trailing slash
	this.rioturl = 'http://riotjs.com/'

	this.events = 
	{

		'Mouse' :
		[
			'onclick',
			'oncontextmenu',
			'ondblclick',
			'onmousedown',
			'onmouseenter',
			'onmouseleave',
			'onmousemove',
			'onmouseover',
			'onmouseout',
			'onmouseup',
		],
		'Keyboard' :
		[
			'onkeydown',
			'onkeypress',
			'onkeyup',
		],
		'Form' :
		[
			'onblur',
			'onchange',
			'onfocus',
			'onfocusin',
			'onfocusout',
			'oninput',
			'oninvalid',
			'onreset',
			'onsearch',
			'onselect',
			'onsubmit',
		],
		'Drag' :
		[
			'ondrag',
			'ondragend',
			'ondragenter',
			'ondragleave',
			'ondragover',
			'ondragstart',
			'ondrop',
		],
		'Clipboard' :
		[
			'oncopy',
			'oncut',
			'onpaste',
		],
		'Media' :
		[
			'onabort',
			'oncanplay',
			'oncanplaythrough',
			'ondurationchange',
			'onemptied',
			'onended',
			'onerror',
			'onloadeddata',
			'onloadedmetadata',
			'onloadstart',
			'onpause',
			'onplay',
			'onplaying',
			'onprogress',
			'onratechange',
			'onseeked',
			'onseeking',
			'onstalled',
			'onsuspend',
			'ontimeupdate',
			'onvolumechange',
			'onwaiting',
		],
		'Animation' :
		[
			'animationend',
			'animationiteration',
			'animationstart',
		],
		'Transition' :
		[
			'transitionend',
		],
		'Misc' :
		[
			'onmessage',
			'onmousewheel',
			'ononline',
			'onoffline',
			'onpopstate',
			'onshow',
			'onstorage',
			'ontoggle',
			'onwheel',
		],
		'Touch' :
		[
			'ontouchcancel',
			'ontouchend',
			'ontouchmove',
			'ontouchstart',
		],
	}



	this.on(
		'update', 
		function()
		{
			var x = this.code.innerHTML
			console.log(x);
		}
	)







	</script>

</cheatsheet>