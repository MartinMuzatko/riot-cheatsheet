<cheatsheet>
	<header>
		RIOT
	</header>
	<main layout="column" layout-wrap>
		<section>
			<h2>HTML CONSTRUCTS</h2>

			<h3>Foreach</h3>
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
							{
								file: 'riot.png',
								path: 'images/'
							}
						&lt;/script&gt;
					</code>
				</pre>
			</article>
			<h3>Yield</h3>
			<pre class="code">
				<code>
					&lt;yield/&gt;
				</code>
			</pre>
			<h3>Conditions</h3>
			<article>
				<h4>Block Element</h4>
				<pre class="code"><code>
					&lt;div if=\{ condition \}&gt;&lt;/div&gt;
				</code></pre>
					
				<h4>Inline</h4>
				<pre class="code"><code>
					&lt;div class=\{ active : condition\}&gt;&lt;/div&gt;
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
							<div>update()</div>
							<div>mount()</div>
							<div>unmount()</div>
						</div>
					</div>
					<div>
						<h4>TRIGGER METHODS</h4>
						<div>
							<div>on()</div>
							<div>one()</div>
							<div>off()</div>
							<div>trigger()</div>
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
			<h2>Triggers - Observable</h2>
			<span>The Riot event system</span>
			<article>
				<h3>Events</h3>
					this.update() is same as this.trigger('update')

					<div>update()</div>
					<div>updated()</div>
					<div>mount()</div>
					<div>unmount()</div>
					

				<h3>Trigger</h3>
					<div>trigger('event') - trigger event</div>
					<div>on('event', function()\{\}) - react on event trigger</div>
					<div>one('event', function()\{\}) - only once</div>
					<div>off() - don't listen to event anymore</div>
			</article>
		</section>

		<section>
			<h2>Riot Object</h2>
			<span></span>
			<article>
				<h3>Methods</h3>
					<div>compile()</div>
					<div>mixin()</div>
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
			<h2>Router</h2>
			<span>Listening to and changing the url hash <small>(#customer/edit/3)</small></span>
			<article>

				<h3>riot.route.route(args, function)</h3>

				<h3>riot.route.route('customer/list')</h3>

				<h3>riot.route.start()</h3>

				<h3>riot.route.stop()</h3>


				<h3>riot.route.exec()</h3>

			</article>
		</section>

		<section>
			<h2>Mixin</h2>
			<span>Reusable functions</span>
			<article>
				<h3>Defining Mixins</h3>
				<pre><code>
					var object = \{ init : function()\{\} \}
				</code></pre>
				<h3>load mixin under namespace</h3>
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
	<section class="globalEvents">
		<h2>Global Events</h2>
		<a href="http://devdocs.io/dom/globaleventhandlers">All GlobalEventHandlers</a>
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
					<a href="https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/{event}">{event}</a>
				</div>
			</div>
		</article>
	</section>

	<script>

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
			'onmoseup',
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